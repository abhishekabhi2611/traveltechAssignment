import React, { useEffect, useState } from 'react'
import './Login.css'
import { NavLink, useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import { isAuthenticated, setAuthentication } from './Helper/authentication'
import axios from 'axios'

const Login = () => {
  let history = useHistory()

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/dashboard')
    } else if (!isAuthenticated()) {
      history.push('/')
    }
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSignIn = (evt) => {
    evt.preventDefault()

    {
      const { email, password } = formData
      const data = { email, password }

      setFormData({ ...formData })

      const signin = async (data) => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response = await axios.post('/signin/', data, config)
        return response
      }

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token)
          if (isAuthenticated()) {
            history.push('/dashboard')
          } else if (!isAuthenticated()) {
            history.push('/')
          }
        })
        .catch((err) => {
          console.log('Server Error', err)
          setFormData({
            ...formData,
          })
          alert(err.response.data.msg)
        })
    }
  }

  return (
    <>
      <div className='LoginContainer'>
        <div className='loginSection'>
          <div className='contentSection'>
            <h2>Customer Login</h2>
            <div>
              <br />
              <form onSubmit={handleSignIn}>
                <TextField
                  id='email'
                  placeholder='Your Email'
                  autoComplete='off'
                  required
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  type='password'
                  placeholder='Your Password'
                  autoComplete='off'
                  required
                  value={password}
                  id='password'
                  name='password'
                  onChange={handleChange}
                />
                <br />
                <section className='LoginbtnSection'>
                  <Button
                    variant='contained'
                    className='px-3 py-2 m-2 ResetBtn'
                  >
                    Reset
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    className='px-3 py-2 m-2 signInButton'
                  >
                    Log In
                  </Button>
                </section>
              </form>
              <NavLink
                className='nav-link mt-2'
                aria-current='page'
                to='/register'
              >
                Don't have an Account ? Sign Up Here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
