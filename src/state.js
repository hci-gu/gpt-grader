import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
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

export const filesAtom = atom([])

const readJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result)
        resolve(json)
      } catch (error) {
        reject(error)
      }
    }
    reader.readAsText(file)
  })
}

export const matchupAtom = unwrap(
  atom(async (get) => {
    const files = get(filesAtom)

    if (!files || !files.length) {
      return null
    }

    const usersFile = files.find(
      // (file) => file.name === 'llama3-70b_users_with_rating.json'
      (file) => file.name === 'llama3-70b_users_tournament.json'
    )
    console.log(usersFile)
    const users = await readJSON(usersFile)

    const matchupsFile = files.find(
      (file) => file.name === 'llama3-70b_matchups.json'
    )
    console.log(matchupsFile)
    const matchups = await readJSON(matchupsFile)

    const scores = users.map((user) => user.score)
    const grades = users.map((user) => user.avgGrade)

    const maxDegree = 5 // Set based on your data size and complexity
    const cvErrors = crossValidate(scores, grades, maxDegree)
    const bestDegree = cvErrors.indexOf(Math.min(...cvErrors)) + 1
    console.log(`Best degree: ${bestDegree}`)
    const degree = bestDegree
    const regression = new PolynomialRegression(scores, grades, degree)

    users.sort((a, b) => a.avgGrade - b.avgGrade)
    return {
      matchups,
      users: users.map((user) => {
        const predictedGrade = Math.round(regression.predict(user.score))
        return {
          ...user,
          predictedGrade,
          error: Math.abs(user.avgGrade - predictedGrade),
        }
      }),
      regression,
    }
  })
)

export const matchupsAtom = unwrap(
  atom(async (get) => {
    const files = get(filesAtom)

    let paths = []
    for (const file of files) {
      // take first part of path
      // console.log(file)
      const path = file.path.split('/')[2]
      // if path is not already in paths
      if (!paths.includes(path)) {
        paths.push(path)
      }
    }

    const runs = []
    for (const path of paths) {
      const run = {
        name: path,
      }

      const modelPaths = []
      for (const file of files.filter((file) => file.path.includes(path))) {
        if (file.name === 'users.json') {
          run.users = await readJSON(file)
          continue
        }
        if (file.name === 'evaluation.json') {
          run.evaluation = await readJSON(file)
          continue
        }

        const path = file.path.split('/')[3]
        if (
          !modelPaths.includes(path) &&
          !path.includes('.json') &&
          !path.includes('.txt')
        ) {
          modelPaths.push(path)
        }
      }

      const models = []
      for (const modelPath of modelPaths) {
        const model = {
          name: modelPath,
          users: null,
          matchups: [],
          intents: [],
        }

        for (const file of files.filter((file) =>
          file.path.includes(`${path}/${modelPath}`)
        )) {
          const json = await readJSON(file)
          const name = file.name.split('.')[0]
          if (file.name === 'users.json') {
            model.users = json
          } else if (file.path.includes('intents')) {
            model.intents.push({
              match: name,
              ...json,
            })
          } else {
            model.matchups.push({
              match: name,
              ...json,
            })
          }
        }

        models.push(model)
      }

      run.models = models

      runs.push(run)
    }

    return runs
  })
)

export const gradesAtom = unwrap(
  atom(async (get) => {
    const files = get(filesAtom)

    let paths = []
    for (const file of files) {
      // take first part of path
      // console.log(file)
      const path = file.path.split('/')[2]
      // if path is not already in paths
      if (!paths.includes(path)) {
        paths.push(path)
      }
    }

    const runs = []
    for (const path of paths) {
      const run = {
        name: path,
      }

      const modelPaths = []
      for (const file of files.filter((file) => file.path.includes(path))) {
        if (file.name === 'users.json') {
          run.users = await readJSON(file)
          continue
        }
        if (file.name === 'evaluation.json') {
          run.evaluation = await readJSON(file)
          continue
        }

        const path = file.path.split('/')[3]
        if (
          !modelPaths.includes(path) &&
          !path.includes('.json') &&
          !path.includes('.txt')
        ) {
          modelPaths.push(path)
        }
      }

      const models = []
      for (const modelPath of modelPaths) {
        const model = {
          name: modelPath,
        }

        // for (const file of files.filter((file) =>
        //   file.path.includes(`${path}/${modelPath}`)
        // )) {
        //   const user = await readJSON(file)
        //   const name = file.name.split('.')[0]

        // }

        models.push(model)
      }

      run.models = models

      runs.push(run)
    }

    return runs
  })
)
