import React, {useEffect, useState} from 'react'
import { Tabs, Paper, Button } from '@mantine/core'
import OutfitSelector from './OutfitSelector'
import { X } from 'phosphor-react';
import useMainStore from '../store/mainStore'

export default function Customisation() {
  const menuOpen = useMainStore((state) => state.menuOpen)
  const isDesktop = useMainStore((state) => state.isDesktop)
  const onResize = useMainStore((state) => state.onResize)
  const handleMenuToggle = useMainStore((state) => state.handleMenuToggle)

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    isDesktop ?
      <Paper shadow="sm" p="md" sx={{margin: "0 16px", height: '100%'}}>
        <TabComponent isDesktop={isDesktop} handleMenuToggle={handleMenuToggle}/>
      </Paper> :
      <Paper shadow="sm" p="md" sx={{position:'absolute', top: 0, right: !menuOpen ? '100%' : '0%', width: '100%', zIndex: 100, height: '100%'}}>
        <TabComponent isDesktop={isDesktop} handleMenuToggle={handleMenuToggle}/>
      </Paper>
  )
}

const TabComponent = ({isDesktop, handleMenuToggle}) => {
  return (
    <Tabs sx={{height: '100%', width: '100%', display: 'flex', flexDirection: "column"}} variant='pills' defaultValue="top">
        <Tabs.List grow position="center">
          <Tabs.Tab value="top">Top</Tabs.Tab>
          <Tabs.Tab value="bottom">Bottom</Tabs.Tab>
          <Tabs.Tab value="body">Body</Tabs.Tab>
          {!isDesktop && <Button onClick={handleMenuToggle}><X size={16} weight="bold" /></Button>}
        </Tabs.List>

        <Tabs.Panel sx={{height: '100%', overflow: "auto", overflowX: "hidden"}} value="top" mt="xs">
          <OutfitSelector />
        </Tabs.Panel>

        <Tabs.Panel sx={{height: '100%', overflow: "auto", overflowX: "hidden"}} value="bottom" mt="xs">
          <OutfitSelector />
        </Tabs.Panel>

        <Tabs.Panel value="body" pt="xs">
          Messages tab content
        </Tabs.Panel>
      </Tabs>
  );
}
