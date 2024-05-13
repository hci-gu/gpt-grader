import fs from 'fs'
import csv from 'csv-parser'
import { v4 as uuid } from 'uuid'
import { DEFAULT_RATING } from './rating.js'

export async function readData(numUsers, file = 'test.csv') {
  return new Promise((resolve) => {
    const data = []

    fs.createReadStream(`./data/${file}`)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        data.push(row)
      })
      .on('end', () => {
        // shuffle data
        data.sort(() => Math.random() - 0.5)
        // take only numUsers
        data.splice(numUsers)

        const users = data.map(({ text, gradeA, gradeB }) => {
          const grades = [parseInt(gradeA), parseInt(gradeB)]

          return {
            id: uuid(),
            rating: DEFAULT_RATING,
            text,
            grades,
            avgGrade: grades.reduce((a, b) => a + b, 0) / grades.length,
            wins: 0,
            losses: 0,
          }
        })

        resolve(users)
      })
  })
}
