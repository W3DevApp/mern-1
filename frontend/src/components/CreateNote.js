import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { Button } from "@material-ui/core"
import Save from '@material-ui/icons/Save'


export default class CreateNote extends Component {

  state = {
    title: '',
    content: '',
    date: new Date(),
    userSelected: '',
    users: [],
    editing: false,
    _id: ''
  }

  async componentDidMount() {
    const res = await axios.get('http://your_backend_host:your_backend_port/api/users')

    if (res.data.length > 0) {
      this.setState({
        users: res.data.map(user => user.username),
        userSelected: res.data[0].username
      })
    }

    if (this.props.match.params.id) {
      const res = await axios.get('http://your_backend_host:your_backend_port/api/notes/' + this.props.match.params.id)
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true
      })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()

    if (this.state.editing) {
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      }
      await axios.put('http://your_backend_host:your_backend_port/api/notes/' + this.state._id, updatedNote)
    } else {
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      }
      axios.post('http://your_backend_host:your_backend_port/api/notes', newNote)
    }
    window.location.href = '/'
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = date => {
    this.setState({ date })
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create Note</h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.userSelected}
                onChange={this.onInputChange}
                name="userSelected"
                required>
                {
                  this.state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                onChange={this.onInputChange}
                name="title"
                value={this.state.title}
                required />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Content"
                name="content"
                onChange={this.onInputChange}
                value={this.state.content}
                required>
              </textarea>
            </div>
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate} />
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
    )
  }
}
