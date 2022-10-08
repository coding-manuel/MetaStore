import React from 'react'
import Experience from '../components/Experience'
import Customisation from '../components/Customisation'
import { Group, Box } from '@mantine/core'
import { Leva } from 'leva'

export default function Creator() {
  return (
    <>
    <Box sx={{height: '100%'}}>
      <Experience />
      <Customisation />
    </Box>
    {/* <Leva /> */}
    </>
  )
}
