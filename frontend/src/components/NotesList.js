import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core"
import Edit from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


export default class NotesList extends Component {

  state = {
    notes: []
  }

  async componentDidMount() {
    this.getNotes()
  }

  getNotes = async () => {
    const res = await axios.get('http://your_backend_host:your_backend_port/api/notes')
    this.setState({
      notes: res.data
    })
  }

  deleteNote = async (noteId) => {
    await axios.delete('http://your_backend_host:your_backend_port/api/notes/' + noteId)
    this.getNotes()
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
            <div className="col-md-4 p-4" key={note._id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5>{note.title}</h5>
                  <Button
                    to={"/edit/" + note._id}
                    startIcon={<Edit />}
                    component={Link}
                    size="small"
                    variant="contained">
                    Edit
                  </Button>
                </div>
                <div className="card-body">
                  <p>
                    {note.content}
                  </p>
                  <p>
                    Author: {note.author}
                  </p>
                  <p>
                    Created: {format(note.createdAt)}
                  </p>
                </div>
                <div className="card-footer">
                  <Button
                    onClick={() => this.deleteNote(note._id)}
                    size="small"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
