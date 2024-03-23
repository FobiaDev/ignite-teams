import { useState } from "react";

import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";

import { createGroup } from "@storage/group/createGroup";

import { AppError } from "@helpers/AppError";

export const NewGroup = () => {
  const [newGroup, setNewGroup] = useState('')

  const navigation = useNavigation()

  const handleNew = () => {
    createGroup(newGroup.trim())
      .then(() => navigation.navigate('players', { group: newGroup }))
      .catch(error => {
        if (error instanceof AppError) {
          Alert.alert('Novo grupo', error.message)
        } else {
          Alert.alert('Novo grupo', 'Não foi possivel criar um novo grupo.')
          console.error(error)
        }
      })
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova Turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setNewGroup}
        />

        <Button
          style={{ marginTop: 20 }}
          onPress={handleNew}
        >
          Criar
        </Button>
      </Content>
    </Container>
  )
}