import React from 'react'
import { Container } from '@mui/material'
import LeftBar from '@/components/LeftBar'

const page = () => {
  return (
    <Container sx={{display:"flex",direction:"column",alignItems:"flex-start",marginTop:"85px"}}>
    <LeftBar />
        
   </Container>
  )
}

export default page
