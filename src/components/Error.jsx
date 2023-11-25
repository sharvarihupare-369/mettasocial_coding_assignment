import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const Error = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} mt="40px">
     <Heading color="red" as="h1" size="lg" >No Data Found! Please Refresh The Page</Heading>
    </Box>
  )
}

export default Error