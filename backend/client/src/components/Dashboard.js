import { Button } from '@material-ui/core'
import React from 'react'
import './Dashboard.css'
import { logout } from './Helper/authentication'
import html from './images/html5.png'
import css from './images/css.png'
import mern from './images/mern.png'
import json from './images/json.png'
import hcj from './images/hcj.png'

const Dashboard = () => {
  const handleLogout = (evt) => {
    logout()
  }
  return (
    <>
      <div>
        <Button className='logout' onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className='DashboardContainer'>
        <div className='leftSection'>
          <div className='firstSection'>
            <div className='box1'>
              <img src={html} alt='image' className='image' />
            </div>
            <div className='box2'>
              <img src={css} alt='image' className='image' />{' '}
            </div>
          </div>
          <div className='box3'>
            <img src={mern} alt='image' className='image' />
          </div>
        </div>
        <div className='rightSection'>
          <div className='SecondSection'>
            <div className='box4'></div>
            <div className='box5'></div>
          </div>

          <div className='box6'>
            {' '}
            <img src={json} alt='image' className='image' />{' '}
          </div>
          <div className='box7'>
            {' '}
            <img src={hcj} alt='image' className='image' />{' '}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
