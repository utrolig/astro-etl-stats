import {
  getKdr,
  getTotalAccuracy,
  getTotalDeaths,
  getTotalGibs,
  getTotalHeadshots,
  getTotalKills,
  getTotalSelfKills,
} from '@/util/statsUtils'
import { type GroupStats } from '@/util/aggregateRoundStats'

export type AwardValue = {
  name: string
  value: number
}

export function byValueDesc(a: AwardValue, b: AwardValue) {
  return b.value - a.value
}

export function byValueAsc(a: AwardValue, b: AwardValue) {
  return a.value - b.value
}

export function getTerminatorAward(stats: GroupStats): AwardValue[] {
  const kdr = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getKdr(s.weaponStats),
    }))
    .sort(byValueDesc)

  return kdr
}

export function getSlaughterhouseAward(stats: GroupStats): AwardValue[] {
  const kills = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getTotalKills(s.weaponStats),
    }))
    .sort(byValueDesc)

  return kills
}

export function getSlaughterhouseLlamaAward(stats: GroupStats): AwardValue[] {
  const deaths = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getTotalDeaths(s.weaponStats),
    }))
    .sort(byValueDesc)

  return deaths
}

export function getSlyFoxAward(stats: GroupStats): AwardValue[] {
  const deaths = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getTotalDeaths(s.weaponStats),
    }))
    .sort(byValueAsc)

  return deaths
}

export function getHarakiriAward(stats: GroupStats): AwardValue[] {
  const selfkills = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getTotalSelfKills(s.playerStats),
    }))
    .sort(byValueDesc)

  return selfkills
}

export function getDesecratorAward(stats: GroupStats): AwardValue[] {
  const gibs = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getTotalGibs(s.playerStats),
    }))
    .sort(byValueDesc)

  return gibs
}

export function getAimbotAward(stats: GroupStats): AwardValue[] {
  const headshots = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getTotalHeadshots(s.weaponStats),
    }))
    .sort(byValueDesc)

  return headshots
}

export function getCrosshairConnoisseurAward(stats: GroupStats): AwardValue[] {
  const accuracy = Object.values(stats)
    .map((s) => ({
      name: s.name,
      value: getTotalAccuracy(s.weaponStats),
    }))
    .sort(byValueDesc)

  return accuracy
}

export function getBaiterAward(stats: GroupStats): AwardValue[] {
  const kazimRegex = new RegExp(/.*k[a]+[z]+[iy]+[mn][em]?.*/gi)

  const baiters = Object.values(stats)
    .filter((s) => kazimRegex.test(s.name))
    .map((s) => ({
      name: `${s.name} 🤣`,
      value: getTotalKills(s.weaponStats) / 2,
    }))

  return baiters
}
