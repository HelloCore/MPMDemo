import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppBar from 'material-ui/AppBar';

import './Header.scss'

export const Header = () => (
  <AppBar
    style={{backgroundColor: '#333'}}
    className="header__appBar"
    title={<span className="header__title">MPM Demo</span>}/>
)

export default Header
