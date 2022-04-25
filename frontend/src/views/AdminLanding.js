import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import { Container, Nav } from 'react-bootstrap'

// import { AdminBillings } from '../admin/AdminBillings'
// import { AdminCars } from '../admin/AdminCars'
// import { AdminTrips } from '../admin/AdminTrips'
import Adminusers  from '../Admin/AdminUsers'
import Admincars  from '../Admin/AdminCars'
import { margin } from '@mui/system'

export function HomeAdmin () {
  const [ subPage, setSubPage ] = useState('users')

  const renderNavBar = () => {
    return (
      <Nav className='admin-nav-bar'>
          <div style = {{backgroundColor: " rgb(13 202 240)", marginTop: "1rem"}}>
        <Nav.Item>
          <Nav.Link className='admin-navigation-item' onClick={() => setSubPage('users')}>
            <h5>Users</h5>
          </Nav.Link>
        </Nav.Item>
        </div >
        <div style = {{backgroundColor: " rgb(13 202 240)" , marginTop: "1rem"}}>
        <Nav.Item>
          <Nav.Link className='admin-navigation-item' onClick={() => setSubPage('cars')}>
            <h5>Cars</h5>
          </Nav.Link>
        </Nav.Item>
        </div>
        <div style = {{backgroundColor: " rgb(13 202 240)", marginTop: "1rem"}}>
        <Nav.Item>
          <Nav.Link className='admin-navigation-item' onClick={() => setSubPage('trips')}>
            <h5>Trips</h5>
          </Nav.Link>
        </Nav.Item>
        </div>
       
      </Nav>
    )
  }

  const renderContent = subPage => {
    switch (subPage) {
      case 'trips':
        // return <AdminTrips />
      case 'cars':
         return <Admincars />
      case 'billings':
        // return <AdminBillings />
      case 'users':
      default:
         return <Adminusers />
    }
  }

  return (
    <Container className="admin-container">
      <Col xs={2}> {renderNavBar()} </Col>
      <Col> {renderContent(subPage)} </Col>

    </Container>
  )
}
