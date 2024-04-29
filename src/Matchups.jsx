import React from 'react'
import { Divider, Flex, Space, Table, Text } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { matchupsAtom } from './state'

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

const Matchups = () => {
  const runs = useAtomValue(matchupsAtom)

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

export default Matchups
