import React from 'react'
import '../styles/layout.css'
import Container from './container'
import Navigation from '../components/navigation'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return <Container>
      <Navigation/>
      {children}
      </Container>
  }
}

export default Template
