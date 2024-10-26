import { type Component, createMemo } from 'solid-js'
import {
  getAimbotAward,
  getBaiterAward,
  getCrosshairConnoisseurAward,
  getDesecratorAward,
  getHarakiriAward,
  getSlaughterhouseAward,
  getSlaughterhouseLlamaAward,
  getSlyFoxAward,
  getTerminatorAward,
} from '@/util/awards'
import { getGroupStats } from '@/util/aggregateRoundStats'
import type { GroupDetails } from '@/util/stats-api'
import { PlayerName } from '@/components/player-name/player-name'
import { SectionTitle } from '@/components/section-title/section-title'

export type AwardsProps = {
  data: GroupDetails
}

export const Awards: Component<AwardsProps> = (props) => {
  const groupStats = createMemo(() => {
    return getGroupStats(props.data)
  })

  const terminator = getTerminatorAward(groupStats())
  const slaughterhouse = getSlaughterhouseAward(groupStats())
  const slaughterhouseLlama = getSlaughterhouseLlamaAward(groupStats())
  const slyFox = getSlyFoxAward(groupStats())
  const harakiri = getHarakiriAward(groupStats())
  const desecrator = getDesecratorAward(groupStats())
  const aimbot = getAimbotAward(groupStats())
  const crosshairConnoisseur = getCrosshairConnoisseurAward(groupStats())
  const baiter = getBaiterAward(groupStats())

  return (
    <div class="flex flex-col bg-etl-bg px-8">
      <div class="flex flex-col">
        <SectionTitle>Main awards</SectionTitle>
        <div class="mb-4" />
        <div class="flex items-center gap-4">
          <p>Terminator</p>
          <PlayerName name={terminator[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Slaughterhouse</p>
          <PlayerName name={slaughterhouse[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Slaughterhouse Llama</p>
          <PlayerName name={slaughterhouseLlama[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Sly fox</p>
          <PlayerName name={slyFox[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Harakiri</p>
          <PlayerName name={harakiri[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Desecrator</p>
          <PlayerName name={desecrator[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Aimbot</p>
          <PlayerName name={aimbot[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Crosshair connisinoisnorinsoeur</p>
          <PlayerName name={crosshairConnoisseur[0]?.name} />
        </div>
        <div class="flex items-center gap-4">
          <p>Baiter</p>
          <PlayerName name={baiter[0]?.name} />
        </div>
      </div>
    </div>
  )
}
