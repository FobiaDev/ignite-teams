import AsyncStorage from "@react-native-async-storage/async-storage"

import { GROUP_COLLECTION } from "@storage/storage.config"

export const getManyGroups = async () => {
  try {
    const storage: string[] = await AsyncStorage
    .getItem(GROUP_COLLECTION)
    .then(json => json ? JSON.parse(json) : [])

    return storage
  } catch (error) {
    throw error
  }
}