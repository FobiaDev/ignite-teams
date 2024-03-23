import { useCallback, useState } from 'react';

import { FlatList } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { Loading } from '@components/Loading';
import { getManyGroups } from '@storage/group/getManyGroups';
import { Container } from './styles';


export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()

  const handleNewGroup = () => {
    navigation.navigate('new')
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  const isEmpty = groups.length === 0

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    getManyGroups()
      .then(data => setGroups(data))
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false)
      })
  }, []))

  return (
    <Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      {
        isLoading ?
          <Loading /> :
          (<FlatList
            data={groups}
            keyExtractor={(item) => item}
            ListEmptyComponent={() => (
              <ListEmpty
                message="Que tal cadastrar a sua primeira turma?"
              />
            )}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={isEmpty ?
              {
                flex: 1
              } :
              {
                gap: 12,
                paddingBottom: 100
              }
            }
            showsVerticalScrollIndicator={false}
          />)
      }

      <Button
        onPress={handleNewGroup}
      >Criar nova turma
      </Button>
    </Container>
  );
}
