import React from 'react'
import { AppShell, Flex, Group, Text, rem } from '@mantine/core'
import { IconUpload, IconFile, IconX } from '@tabler/icons-react'

import { Dropzone } from '@mantine/dropzone'
import { useSetAtom } from 'jotai'
import { filesAtom } from './state'
import Matchups from './Matchups'
import Grades from './Grades'

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
        {/* <Grades /> */}
        <Matchups />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
