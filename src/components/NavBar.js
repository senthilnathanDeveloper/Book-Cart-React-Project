"use client"
import React from 'react'
import { useState } from 'react';
import { AppBar, Toolbar,Typography,InputBase,Stack,Button,MenuItem,MenuList,Paper,Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'next/link';


const Search=styled(("div"))({
  backgroundColor:"white",
  width:"400px",
  height:"35px",
  display:"flex",
  alignItems:"center",
  position:"relative",
  borderRadius:"3px", 
});

const Icons=styled((Box))({
  display:"flex",
  alignItems:"center",
  gap:"20px",
  color:"white",
  fontWeight:"bold",
  cursor:"pointer",
});

const NavBar = () => {
  const isLoggedIn=true;
  const [menuOpen,setMenuOpen]=useState(false);

  const handleMenu =()=>{
    setMenuOpen(prev=>!prev);
  }

  return (
    <Box>
        <AppBar position='sticky'>
            <Toolbar sx={{color:"#121858",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <Stack component={Link} to="/" direction="row" alignItems="center" spacing={1} sx={{cursor:"pointer",textDecoration:"none"}}> 
                  <BookIcon sx={{color:"white"}}/>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{color:"white",fontWeight:"bold"}}>
                    Book Cart
                    </Typography>
              </Stack>
                

                <Search>
                    <InputBase placeholder='Search books or authors' sx={{fontSize:"20px",color:"#212121",paddingX:"10px"}} 
                       />
                    <ClearIcon sx={{position:"absolute",right:"10px",color:"blue"}} />
                </Search>

                <Icons>

                  {isLoggedIn && (
                      <Stack direction="row" position="relative" >
                      <FavoriteIcon/>
                      <CircleIcon sx={{color:"red",position:"absolute",top:"-10px",left:"10px",fontSize:"20px"}}/>
                    </Stack>
                  )}
                    

                    <Stack  direction="row" position="relative">
                      <ShoppingCartIcon />
                      <CircleIcon sx={{color:"red",position:"absolute",top:"-10px",left:"10px",fontSize:"20px"}}/>
                    </Stack>

                    {isLoggedIn ? (
                      <Stack direction="row" position="relative" onClick={handleMenu} >
                      <AccountCircleIcon/>
                      <ArrowDropDownIcon/>
                          {menuOpen && (
                            <Paper sx={{position:"absolute",top:"30px",right:0}}>
                            <MenuList>
                              <MenuItem>My Orders</MenuItem>
                              <MenuItem>Logout</MenuItem>
                            </MenuList>
                            </Paper>
                          )}   
                      </Stack>
                         
                    ) : (
                      <Stack direction="row" spacing={1}>
                      <Button sx={{color:"white",fontWeight:"bold",textTransform:"none"}}>Login</Button>
                    </Stack>
                    ) }   
                </Icons>

            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default NavBar
