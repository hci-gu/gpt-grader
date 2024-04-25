import React from 'react'
import {
  AppShell,
  Burger,
  Divider,
  Flex,
  Group,
  Space,
  Table,
  Text,
  rem,
} from '@mantine/core'
import { IconUpload, IconFile, IconX } from '@tabler/icons-react'

import { Dropzone } from '@mantine/dropzone'

import { useAtomValue, useSetAtom } from 'jotai'
import { filesAtom, runsAtom } from './state'

const FileUpload = () => {
  const setFiles = useSetAtom(filesAtom)

  return (
    <Dropzone
      onDrop={(files) => setFiles(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={'*'}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: 'var(--mantine-color-blue-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: 'var(--mantine-color-red-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile
            style={{
              width: rem(52),
              height: rem(52),
              color: 'var(--mantine-color-dimmed)',
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag folder here or click to select it
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Should be "runs" folder in ./data
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}

const winnerForMatchup = (model, uid1, uid2) => {
  return
}

const Run = ({ run }) => {
  console.log('RUN', run)
  // const rows = run.models.map((model) => {

  // })

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

const Runs = () => {
  const runs = useAtomValue(runsAtom)

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

const App = () => {
  return (
    <AppShell header={{ height: 50 }} padding="md">
      <AppShell.Header>
        <Flex align="center" h={50} ml="md">
          GPT Grader
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        <FileUpload />
        <Runs />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
