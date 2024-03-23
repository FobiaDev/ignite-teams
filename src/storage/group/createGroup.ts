import AsyncStorage from "@react-native-async-storage/async-storage"

import { GROUP_COLLECTION } from "@storage/storage.config"

import { getManyGroups } from "./getManyGroups"

import { AppError } from "@helpers/AppError"

export const createGroup = async (newGroupName: string) => {
  try {
    const storedGroups = await getManyGroups()

    if(!newGroupName) throw new AppError('Informe o nome da turma.')

    const groupAlreadyExists = storedGroups.includes(newGroupName)

    if (groupAlreadyExists) throw new AppError('Já existe uma turma cadastrada com esse nome.')

    const storage = JSON.stringify([...storedGroups, newGroupName])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}