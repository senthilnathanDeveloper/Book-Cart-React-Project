'use client'

import { useState } from 'react'
import { useFormik } from 'formik'


import{
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Link,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/userSlice'

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export default function Login({ onToggleForm }) {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
         dispatch(loginUser(values));
    },
  })

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 550,
        mx: 'auto',
        p: 0,
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          bgcolor: '#ff4081',
          color: 'white',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Login
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">New User?</Typography>
          <Button 
            component="button"
            onClick={onToggleForm}
            color="inherit"
            underline="none"
            sx={{ fontWeight: 500,backgroundColor:"white",color:"black",fontSize:"14px",textTransform:'capitalize' }}
          >
           Register
           
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant='outlined'
            id="username"
            name="username"
            placeholder="Enter Your Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
            sx={{ 
              mt: 0,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant='outlined'
            id="password"
            name="password"
            placeholder="Enter Your password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: '#3f51b5',
              borderRadius: 1,
              textTransform: 'none',
              py: 1,
              '&:hover': {
                bgcolor: '#303f9f',
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Paper>
  )
}

