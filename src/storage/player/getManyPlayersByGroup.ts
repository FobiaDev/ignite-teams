import AsyncStorage from "@react-native-async-storage/async-storage"

import { PLAYER_COLLECTION } from "@storage/storage.config"

import { PlayerStorageDTO } from "./PlayerStorageDTO"

export const getManyPlayersByGroup = async (group: string) => {
  try {
    const storage: PlayerStorageDTO[] = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)
    .then(json => json ? JSON.parse(json): [])

    return storage
  } catch (error) {
    throw error
  }
}