import { getManyPlayersByGroup } from './getManyPlayersByGroup'

export const getManyPlayersByGroupAndTeam = async (group: string, team: string) => {
  try {
    const storage = await getManyPlayersByGroup(group)
    .then(data => data.filter(player => player.team === team))

    return storage
  } catch (error) {
    throw error
  }
}