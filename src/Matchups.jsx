import React from 'react'
import { Divider, Flex, Space, Table, Text } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { matchupAtom, matchupsAtom } from './state'
import { ScatterChart } from '@mantine/charts'

// Function to linearly interpolate between two colors
function lerp(color1, color2, t) {
  return color1.map((c1, i) => Math.round(c1 + (color2[i] - c1) * t))
}

function interpolateColor(val) {
  if (val < -5 || val > 5) {
    throw new Error('Input value should be in the range [-5, 5]')
  }

  // RGB values for deep red, yellow, and bright green
  const deepRed = [139, 0, 0]
  const yellow = [255, 255, 0]
  const brightGreen = [0, 255, 0]

  if (val < 0) {
    // Interpolate between deep red and yellow
    return lerp(deepRed, yellow, (val + 5) / 5)
  } else {
    // Interpolate between yellow and bright green
    return lerp(yellow, brightGreen, val / 5)
  }
}

const getColorForScore = (score) => {
  return `rgb(${interpolateColor(score).join(',')})`
}

const Run = ({ run }) => {
  return (
    <Flex direction="column">
      <Text size="xl" weight={700} mt="lg">
        {run.name}
      </Text>
      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Grade</Table.Th>
            {run.models.map((model) => (
              <Table.Th key={model.name}>{model.name}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {run.users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.avgGrade}</Table.Td>
              {run.models.map((model) => {
                if (!run.evaluation[model.name]) return <Table.Td>-</Table.Td>
                const { grade } = run.evaluation[model.name].users.find(
                  (u) => u.id === user.id
                )
                return <Table.Td>{grade}</Table.Td>
              })}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Text size="xl" weight={700} mt="lg">
        Matchups
      </Text>
      {run.models.map((model) => (
        <>
          <Text size="xl" weight={700} mt="lg">
            {model.name}
          </Text>
          <Table striped withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                {run.users.map((user, i) => (
                  <Table.Th key={user.id}>{i + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {run.users.map((user, i) => (
                <Table.Tr key={user.id}>
                  <Table.Td>{i}</Table.Td>
                  {run.users.map((user2, j) => (
                    <Table.Td key={user2.id}>{i === j ? '-' : 'X'}</Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      ))}
    </Flex>
  )
}

const UsersWithRating = ({ users, matchups }) => {
  const usersSortedByGrade = [...users].sort((a, b) => a.avgGrade - b.avgGrade)
  const usersSortedByRating = [...users].sort((a, b) => a.score - b.score)

  return (
    <Table striped withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Td></Table.Td>
          {usersSortedByGrade.map((user, i) => (
            <Table.Td>{user.avgGrade}</Table.Td>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Td></Table.Td>
        {usersSortedByRating.map((user1, i) => (
          <Table.Tr key={user1.id}>
            <Table.Td>{user1.score}</Table.Td>
            {users.map((user2, j) => {
              const matchup = matchups.find(
                (m) =>
                  (m.text1 === user1.id && m.text2 === user2.id) ||
                  (m.text1 === user2.id && m.text2 === user1.id)
              )
              if (matchup) {
                return (
                  <Table.Td
                    style={{ background: getColorForScore(matchup.score) }}
                    // style={{
                    //   background: matchup.expectedWinnerWon ? 'lime' : 'red',
                    // }}
                  >
                    {matchup.score}
                  </Table.Td>
                )
              }

              return (
                <Table.Td style={{ background: getColorForScore(0) }}>
                  {0}
                </Table.Td>
              )
            })}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

const Users = ({ users, regression }) => {
  const usersSortedByScore = [...users].sort((a, b) => a.score - b.score)
  const averageError =
    users.reduce((acc, curr) => acc + curr.error, 0) / users.length
  console.log('averageError', averageError)

  return (
    <>
      <div style={{ height: 350, width: 600, padding: 16 }}>
        <ScatterChart
          h={350}
          width={500}
          data={[
            {
              name: 'users',
              data: users,
            },
          ]}
          dataKey={{ x: 'avgGrade', y: 'score' }}
          xAxisLabel="Grade"
          yAxisLabel="Score"
          yAxisProps={{ tickMargin: 1 }}
          xAxisProps={{ tickMargin: 0.5, domain: [0, 5] }}
          scatterProps={{
            line: true,
            lineType: 'fitting',
          }}
        />
      </div>
      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Grade</Table.Th>
            <Table.Th>Score</Table.Th>
            <Table.Th>Prediction</Table.Th>
            <Table.Th>Error</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {usersSortedByScore.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.avgGrade}</Table.Td>
              <Table.Td>{user.score}</Table.Td>
              <Table.Td>{user.predictedGrade}</Table.Td>
              <Table.Td>{user.error}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}

const Matchups = () => {
  const value = useAtomValue(matchupAtom)

  if (!value) return 'upload something first...'

  return (
    <div>
      <Users users={value.users} regression={value.regression} />
      {/* <UsersWithRating users={value.users} matchups={value.matchups} /> */}
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
    </div>
  )
  // const runs = useAtomValue(matchupsAtom)

  // return (
  //   <Flex direction="column">
  //     {runs?.map((run) => (
  //       <>
  //         <Run key={run.name} run={run} />
  //         <Space h={25} />
  //         <Divider />
  //       </>
  //     ))}
  //   </Flex>
  // )
}

export default Matchups
