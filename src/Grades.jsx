import React from 'react'
import { Divider, Flex, Space, Table, Text } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { gradesAtom, matchupsAtom } from './state'

function getColor(value) {
  if (value < 0 || value > 5) {
    throw new Error('Value must be between 0 and 5.')
  }

  let red, green

  if (value <= 1) {
    // Transition from green (0,255,0) to yellow (255,255,0)
    red = Math.round(255 * value) // Red goes from 0 to 255 as value goes from 0 to 1
    green = 255 // Green stays at full
  } else {
    // Transition from yellow (255,255,0) to red (255,0,0)
    red = 255 // Red stays at full
    green = Math.round(255 * (1 - (value - 1) / 4)) // Green goes from 255 to 0 as value goes from 1 to 5
  }

  // Construct the color string in RGB format.
  return `rgb(${red}, ${green}, 0)`
}

const colorForGrade = (grade, compareGrade) => {
  const diff = Math.abs(grade - compareGrade)

  return getColor(diff)
}

const Run = ({ run }) => {
  const users = run.users.sort((a, b) => a.avgGrade - b.avgGrade)
  const models = run.models.sort((a, b) => a.name.localeCompare(b.name))
  console.log(models)

  return (
    <Flex direction="column">
      <Text size="xl" weight={700} mt="lg">
        {run.name}
      </Text>
      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            {models.map((model) => (
              <Table.Th key={model.name}>{model.name}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Average error</Table.Td>
            {models.map((model) => (
              <Table.Td key={model.name}>
                {run.evaluation[model.name].averageError}
              </Table.Td>
            ))}
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Variance</Table.Td>
            {models.map((model) => (
              <Table.Td key={model.name}>
                {run.evaluation[model.name].variance.toFixed(2)}
              </Table.Td>
            ))}
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Space h={10} />
      <Divider />
      <Space h={10} />

      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Grade</Table.Th>
            {models.map((model) => (
              <Table.Th key={model.name}>{model.name}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.avgGrade}</Table.Td>
              {models.map((model) => {
                if (!run.evaluation[model.name]) return <Table.Td>-</Table.Td>
                const { grade } = run.evaluation[model.name].users.find(
                  (u) => u.id === user.id
                )
                return (
                  <Table.Td bg={colorForGrade(grade, user.avgGrade)}>
                    {grade}
                  </Table.Td>
                )
              })}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Flex>
  )
}

const Grades = () => {
  const runs = useAtomValue(gradesAtom)

  return (
    <Flex direction="column">
      {runs?.map((run) => (
        <>
          <Run key={run.name} run={run} />
          <Space h={25} />
          <Divider />
        </>
      ))}
    </Flex>
  )
}

export default Grades
