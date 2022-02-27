import React, { Component } from 'react'
import axios from 'axios'
import { Button } from "@material-ui/core"
import Save from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'


export default class CreateUser extends Component {

  state = {
    username: '',
    users: []
  }

  async componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    const res = await axios.get('http://your_backend_host:your_backend_port/api/users')
    this.setState({
      users: res.data
    })
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://your_backend_host:your_backend_port/api/users', {
      username: this.state.username
    })
    this.setState({ username: '' })
    this.getUsers()
  }

  deleteUser = async (userId) => {
    const response = window.confirm('are you sure you want to delete it?')
    if (response) {
      await axios.delete('http://your_backend_host:your_backend_port/api/users/' + userId)
      this.getUsers()
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={this.state.username}
                  type="text"
                  onChange={this.onChangeUsername}
                />
              </div>
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                startIcon={<Save />}
              >
                Save
              </Button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {
              this.state.users.map(user => (
                <li className="list-group-item list-group-item-action" key={user._id}>
                  {user.username}
                  <IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" color="secondary" onClick={() => this.deleteUser(user._id)} />
                  </IconButton>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}