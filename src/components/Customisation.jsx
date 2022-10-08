import React from 'react'
import { Tabs, Paper } from '@mantine/core'
import OutfitSelector from './OutfitSelector'
export default function Customisation() {
  return (
    <Paper shadow="sm" p="md" sx={{position:"absolute", top: "50%", margin: "0 16px", right: 0, height: '90%', width:"420px", transform:"translate(0, -50%)"}}>
        <Tabs sx={{height: '100%', width: '100%', display: 'flex', flexDirection: "column"}} variant='pills' defaultValue="outfit">
          <Tabs.List grow position="center">
            <Tabs.Tab value="outfit">Outfit</Tabs.Tab>
            <Tabs.Tab value="body">Body</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel sx={{height: '100%', overflow: "auto", overflowX: "hidden"}} value="outfit" mt="xs">
            <OutfitSelector />
          </Tabs.Panel>

          <Tabs.Panel value="body" pt="xs">
            Messages tab content
          </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}
