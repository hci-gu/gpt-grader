import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

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

export const runsAtom = unwrap(
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
        if (!modelPaths.includes(path) && !path.includes('.json')) {
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

// export const run = atom((get) => {
//   const files = get(filesAtom)

//   let paths = []
//   for (const file of files) {
//     // take first part of path
//     const path = file.path.split('/')[2]
//     // if path is not already in paths
//     if (!paths.includes(path)) {
//       paths.push(path)
//     }
//   }

//   return Math.random()
// })
