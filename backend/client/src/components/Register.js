import React, { useState } from 'react'
import './Register.css'
import { NavLink } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import axios from 'axios'

const Register = () => {
  const [SignUpData, setSignUpData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    password: '',
    cpassword: '',
  })
  const ToLogin = () => {
    window.location.pathname = '/'
  }
  const { firstname, lastname, email, dob, password, cpassword } = SignUpData

  const handleChange = (e) => {
    setSignUpData({
      ...SignUpData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    {
      const { firstname, lastname, email, dob, password, cpassword } =
        SignUpData
      const data = { firstname, lastname, email, dob, password, cpassword }

      setSignUpData({ ...SignUpData })

      const AddUser = async (data) => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response = await axios.post('/user/', data, config)
        return response
      }

      AddUser(data)
        .then((response) => {
          setSignUpData({
            firstname: '',
            lastname: '',
            email: '',
            dob: '',
            password: '',
            cpassword: '',
          })
          alert(response.data.success.success[0].msg)
          window.location.pathname = '/'
        })
        .catch((err) => {
          setSignUpData({
            ...SignUpData,
          })
          console.log(err.response)
          alert(err.response.data.errors.errors[0].msg)
        })
    }
  }
  return (
    <>
      <div className='RegistrationContainer'>
        <div className='RegisterSection'>
          <div className='contentSection'>
            <h2>Register Customer </h2>
            <div>
              <br />
              <form onSubmit={handleSubmit}>
                <TextField
                  id='firstName'
                  placeholder=' First Name'
                  autoComplete='off'
                  name='firstname'
                  value={firstname}
                  onChange={handleChange}
                  required
                />
                <br />
                <TextField
                  id='lastName'
                  placeholder=' Last Name'
                  autoComplete='off'
                  name='lastname'
                  value={lastname}
                  onChange={handleChange}
                  required
                />
                <br />
                <TextField
                  id='email'
                  placeholder=' Email'
                  autoComplete='off'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  required
                />
                <br />
                <TextField
                  id='dob'
                  type='date'
                  autoComplete='off'
                  name='dob'
                  value={dob}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  id='password'
                  type='password'
                  placeholder=' Password'
                  autoComplete='off'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  required
                />
                <br />
                <TextField
                  id='cpassword'
                  type='password'
                  placeholder='Confirm Password'
                  autoComplete='off'
                  name='cpassword'
                  value={cpassword}
                  onChange={handleChange}
                  required
                />
                <br />
                <section className='RegisterBtnSection'>
                  <Button
                    onClick={ToLogin}
                    variant='contained'
                    className='px-3 py-2 m-2 ResetBtn'
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    className='px-3 py-2 m-2 signUpButton'
                  >
                    Register
                  </Button>
                </section>
              </form>
              <NavLink className='nav-link mt-2' aria-current='page' to='/'>
                Already Have an Account ? Sign In Here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
