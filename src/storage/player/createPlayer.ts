import AsyncStorage from "@react-native-async-storage/async-storage"

import { PLAYER_COLLECTION } from "@storage/storage.config"

import { PlayerStorageDTO } from "./PlayerStorageDTO"

import { AppError } from "@helpers/AppError"

import { getManyPlayersByGroup } from "./getManyPlayersByGroup"

export const createPlayer = async (newPlayer: PlayerStorageDTO, group: string) => {
  try {
    if(!newPlayer.name) throw new AppError("Informe o nome da pessoa para adicionar.")

    const storedPlayers = await getManyPlayersByGroup(group)

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

    if(playerAlreadyExists.length > 0) throw new AppError('Essa pessoa já está em um time.')

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw(error)
  }
}