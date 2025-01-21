'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as yup from 'yup'


const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: yup.string()
    .oneOf(['male', 'female'], 'Please select a gender')
    .required('Gender is required'),
})

export default function Register({ onToggleForm }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
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
          User Registration
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Already Registered?</Typography>
          <Button
            component="button"
            onClick={onToggleForm}
            color="inherit"
            underline="none"
            sx={{ fontWeight: 500, backgroundColor:"white",color:"black",fontSize:"14px",textTransform:'capitalize' }}
          >
            Login
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
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
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <TextField
            fullWidth
            id="username"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            placeholder="Password"
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

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <FormControl
            component="fieldset"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            sx={{ mt: 2 }}
            fullWidth
          >
            <FormLabel component="legend" sx={{ fontSize: '0.875rem', color: 'text.primary' }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>

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
            Register
          </Button>
        </form>
      </Box>
    </Paper>
  )
}

