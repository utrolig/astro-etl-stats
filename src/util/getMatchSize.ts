export function getMatchSize(total: number) {
  const perTeam = total / 2;
  return perTeam + "v" + perTeam;
}
