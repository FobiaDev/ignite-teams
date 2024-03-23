import AsyncStorage from "@react-native-async-storage/async-storage"

import { PLAYER_COLLECTION } from "@storage/storage.config"

import { getManyPlayersByGroup } from "./getManyPlayersByGroup"

export const removePlayerByGroup = async (playerName: string, group: string) => {
  try {
    const storage = await getManyPlayersByGroup(group)
    .then(data => data.filter(player => player.name !== playerName))
    .then(dataToJSON => JSON.stringify(dataToJSON))

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}