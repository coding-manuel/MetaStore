import React from 'react'
import { Tabs, Paper } from '@mantine/core'
export default function Customisation() {
  return (
    <Paper shadow="sm" p="md" sx={{position:"absolute", top: "50%", margin: "0 16px", right: 0, height: '90%', width:"400px", transform:"translate(0, -50%)"}}>
        <Tabs variant='pills' defaultValue="gallery">
        <Tabs.List grow position="center">
          <Tabs.Tab value="gallery">Outfit</Tabs.Tab>
          <Tabs.Tab value="messages">Body</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          Gallery tab content
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          Messages tab content
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}
