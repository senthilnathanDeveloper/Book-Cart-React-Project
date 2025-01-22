"use client"
import React from 'react'
import { useState } from 'react';
import { AppBar, Toolbar,Typography,InputBase,Stack,Button,MenuItem,MenuList,Paper,Box,IconButton,Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';


const Search=styled(("div"))({
  backgroundColor:"white",
  width:"400px",
  height:"35px",
  display:"flex",
  alignItems:"center",
  position:"relative",
  borderRadius:"3px", 
});

const NavBar = () => {
  const isLoggedIn=true;
  const [menuOpen,setMenuOpen]=useState(false);
  const [isFocused,setIsFocused]=useState(false);
  const [searchValue,setSearchValue]=useState("");

  const handleMenu =()=>{
    setMenuOpen(prev=>!prev);
  }
  const handleClearSearch=()=>{
    setSearchValue("");
  }

  return (
    <Box>
        <AppBar position='fixed'>
            <Toolbar sx={{backgroundColor:"#3f51b5",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Link href="/">
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{cursor:"pointer",textDecoration:"none",color:"white"}}>
                  <BookIcon sx={{fontSize:"20px"}} />
                  <Typography variant="h6" component="div" sx={{marginLeft:"7px",fontWeight:"bold"}}>
                    Book Cart
                  </Typography>        
              </IconButton>
            </Link>
              
              <Search>
                    <InputBase placeholder='Search books or authors' sx={{fontSize:"20px",color:"#212121",paddingX:"10px",
                       "& input::placeholder": {
                        color: "#3c3c3c", 
                        opacity:0.8,}}}
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                       />
                       {isFocused && (
                            <ClearIcon sx={{position:"absolute",right:"10px",color:"#001f6c",opacity:0.9,fontSize:"20px"}} 
                            onClick={handleClearSearch}/>
                       )}
                    
              </Search>
                
          <Box sx={{display:"flex",alignItems:"center"}}>
            {isLoggedIn && (
            <IconButton size="large" aria-label="favorite" color="inherit">
              <Badge badgeContent={1} color="error">
              <FavoriteIcon/>
              </Badge>
            </IconButton>
            )}

            <IconButton size="large" aria-label="shoppingcart" color="inherit">
              <Badge badgeContent={1} color="error">
              <ShoppingCartIcon/>
              </Badge>
            </IconButton>

            {isLoggedIn ? (
            <IconButton size="large" edge="end" aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit" >
              <AccountCircleIcon/>
              <ArrowDropDownIcon/>
              {menuOpen && (
                            <Paper sx={{position:"absolute",top:"40px",right:0,height:"110px"}}>
                            <MenuList>
                             <MenuItem sx={{ paddingY: "10px", marginY: "4px" }}>My Orders</MenuItem>
                              <MenuItem>Logout</MenuItem>
                            </MenuList>
                            </Paper>
                          )}  
            </IconButton>
              ) : (
                <Stack direction="row" spacing={1}>
                      <Button sx={{color:"white",fontWeight:"bold",textTransform:"none"}}>Login</Button>
                    </Stack>
                    ) }
          </Box>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default NavBar
