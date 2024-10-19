import { convertWeaponStats } from "./convertWeaponStats";
import type { GroupDetails } from "./stats-api";

type PlayerData = {
  id: string;
  name: string;
  weaponStats: ReturnType<typeof convertWeaponStats>;
  team: string;
};

type TeamData = {
  name: "alpha" | "beta";
  players: PlayerData[];
};

export function aggregateRoundStats(group: GroupDetails) {
  const { rounds } = group.match;

  const alpha: TeamData = {
    name: "alpha",
    players: [],
  };

  const beta: TeamData = {
    name: "beta",
    players: [],
  };

  const playersMap: Record<string, PlayerData> = {};

  rounds.forEach((round) => {
    Object.entries(round.round_data.player_stats).forEach(
      ([playerId, player]) => {
        const convertedStats = convertWeaponStats(
          player.weaponStats.map(Number),
        );

        let playerData = playersMap[playerId];

        if (!playerData) {
          playerData = playersMap[playerId] = {
            id: playerId,
            name: player.name,
            team: player.team,
            weaponStats: [],
          };
        }

        playerData.weaponStats.push(...convertedStats);
      },
    );
  });

  Object.values(playersMap).forEach((player) => {
    if (player.team === "1") {
      alpha.players.push(player);
    } else {
      beta.players.push(player);
    }
  });

  return { alpha, beta };
}
