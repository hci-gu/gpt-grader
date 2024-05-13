import { PolynomialRegression } from 'ml-regression-polynomial'

function crossValidate(dataX, dataY, maxDegree) {
  const k = 5 // Number of folds
  const chunkSize = Math.floor(dataX.length / k)
  let errors = new Array(maxDegree).fill(0)

  for (let degree = 1; degree <= maxDegree; degree++) {
    for (let i = 0; i < k; i++) {
      const validX = dataX.slice(i * chunkSize, (i + 1) * chunkSize)
      const validY = dataY.slice(i * chunkSize, (i + 1) * chunkSize)
      const trainX = [
        ...dataX.slice(0, i * chunkSize),
        ...dataX.slice((i + 1) * chunkSize),
      ]
      const trainY = [
        ...dataY.slice(0, i * chunkSize),
        ...dataY.slice((i + 1) * chunkSize),
      ]

      const regression = new PolynomialRegression(trainX, trainY, degree)
      const validPredict = validX.map((x) => regression.predict(x))
      errors[degree - 1] += meanSquaredError(validY, validPredict) / k // Average MSE over k folds
    }
  }

  return errors
}

// Helper function to calculate mean squared error
function meanSquaredError(actual, predicted) {
  const sum = actual.reduce(
    (accumulator, value, index) =>
      accumulator + Math.pow(value - predicted[index], 2),
    0
  )
  return sum / actual.length
}

export const regressionForUsers = (users) => {
  const scores = users.map((user) => user.score)
  const grades = users.map((user) => user.avgGrade)

  const maxDegree = 5 // Set based on your data size and complexity
  const cvErrors = crossValidate(scores, grades, maxDegree)
  const bestDegree = cvErrors.indexOf(Math.min(...cvErrors)) + 1

  return new PolynomialRegression(scores, grades, bestDegree)
}
