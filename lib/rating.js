export function calculateElo(winnerRating, loserRating) {
  const k = 32
  const expectedWinner =
    1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400))
  const expectedLoser = 1 - expectedWinner
  return [
    winnerRating + k * (1 - expectedWinner),
    loserRating + k * (0 - expectedLoser),
  ]
}

export function calculateRating(winnerRating, loserRating) {
  return calculateElo(winnerRating, loserRating)
}
