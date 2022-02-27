import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navigation extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-md bg-dark navbar-dark p-3">
        <Link className="navbar-brand" to="/">
          MERN-1
        </Link>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/" className="nav-link">Notes</Link>
            </li>
            <li class="nav-item">
              <Link to="/create" className="nav-link">Create Note</Link>
            </li>
            <li class="nav-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
