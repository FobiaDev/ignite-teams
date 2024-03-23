import { useEffect, useRef, useState } from "react"

import { Alert, FlatList, TextInput } from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native"

import { Button } from "@components/Button"
import { ButtonIcon } from "@components/ButtonIcon"
import { Filter } from "@components/Filter"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { ListEmpty } from "@components/ListEmpty"
import { Loading } from "@components/Loading"
import { PlayerCard } from "@components/PlayerCard"

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"

import { removeGroup } from "@storage/group/removeGroup"
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO"
import { createPlayer } from "@storage/player/createPlayer"
import { getManyPlayersByGroupAndTeam } from "@storage/player/getManyPlayersByGroupAndTeam"
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup"

import { AppError } from "@helpers/AppError"

interface RouteParams {
  group: string
}

export const Players = () => {
  const [playerName, setPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const route = useRoute()
  const { group } = route.params as RouteParams

  const fetchPlayersByTeam = () => {
    setIsLoading(true)
    getManyPlayersByGroupAndTeam(group, team)
      .then(data => setPlayers(data))
      .catch(error => {
        console.error(error)
        Alert.alert('Jogadores', "Não foi possível carregar os jogadores do time selecionado.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleRemoveGroup = () => {
    Alert.alert(
      'Remover grupo',
      'Deseja remover o grupo?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            removeGroup(group)
              .then(() => {
                navigation.navigate('groups')
              })
              .catch()
          }
        }
      ]
    )
  }

  const handleRemovePlayer = (playerName: string) => {
    removePlayerByGroup(playerName, group)
      .then(() => {
        fetchPlayersByTeam()
        Alert.alert('Remover jogador', `${playerName} foi removido.`)
      })
      .catch(error => {
        Alert.alert('Remover jogador', 'Não foi possível remover jogador.')
        console.error(error)
      })
  }

  const handleAddPlayer = () => {
    const newPlayer: PlayerStorageDTO = {
      name: playerName.trim(),
      team
    }

    createPlayer(newPlayer, group)
      .then(() => {
        fetchPlayersByTeam()
        newPlayerNameInputRef.current?.blur()
        setPlayerName('')
      })
      .catch(error => {
        if (error instanceof AppError) {
          Alert.alert('Novo jogador', error.message)
        } else {
          Alert.alert('Novo jogador', 'Não foi possível adicionar este jogador.')
          console.error(error)
        }
      })
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  const isPlayersEmpty = players.length === 0

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          onChangeText={setPlayerName}
          value={playerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          contentContainerStyle={{
            gap: 12
          }}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ?
        <Loading /> :
        (<FlatList
          data={players}
          keyExtractor={item => item.name}
          contentContainerStyle={
            isPlayersEmpty ?
              { flex: 1 } :
              {
                gap: 16,
                paddingBottom: 100
              }
          }
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Não há pessoas nesse time."
            />
          )}
          showsVerticalScrollIndicator={false}
        />)}

      <Button
        type="SECONDARY"
        onPress={handleRemoveGroup}
      >
        Remover Turma
      </Button>
    </Container>
  )
}