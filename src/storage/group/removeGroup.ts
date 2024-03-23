import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storage.config"
import { getManyGroups } from "./getManyGroups"

export const removeGroup = async (groupName: string) => {
  try {
    const storageGroups = await getManyGroups()
    .then(data => data.filter(group => group !== groupName))
    .then(dataToJSON => JSON.stringify(dataToJSON))

    await AsyncStorage.setItem(GROUP_COLLECTION, storageGroups)
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)
  } catch (error) {
    throw error
  }
}