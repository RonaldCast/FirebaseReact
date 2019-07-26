import React, {Component} from 'react';
import Note from './Note/Note'
import NoteForm from './NoteForm/NoteForm'
import './App.css';

import firebase from 'firebase'

import {DB_CONFIG} from './config/config'

class App extends Component{
  constructor(){
    super();
    
    this.state ={
      notes:[
        // {
        //   noteId: 1,
        //   noteContent: 'note 1'
        // },
        //  {
        //    noteId: 2,
        //    noteContent: 'note 2'
        //  }
      ]
    }
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes')
    this.addNote = this.addNote.bind(this)
  } 
  
  componentDidMount(){
    const {notes} = this.state;
    this.db.on("child_added", snap =>{
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
        this.setState({notes})
    })
  

    this.db.on('child_removed', snap => {
      
        let index = notes.findIndex((note) =>{
          return note.noteId === snap.key
        })

          console.log(snap.key)

        notes.splice(index, 1)
    
        this.setState({
          notes
        })
    })
  }
  removeNote(noteId){
    firebase.database().ref("notes").child(noteId).remove()
  }

  addNote(note){
      let {notes} = this.state
      // notes.push({
      //   noteId: notes.length + 1,
      //   noteContent: note
      // })

      this.db.push({
          noteContent: note
      })

      this.setState({notes})
  }
  render(){
    return ( 
      <div className="notesContainer">
        <div className="notesHeader">
          <h2 className="text-center py-2 bg-primary">React note with firebase</h2>
        </div>
        <div className="">
            <ul className="">
            {
              this.state.notes.map( note => {
                return(
                  <Note noteId={note.noteId} noteContent={note.noteContent} removeNote={this.removeNote}></Note>
                )
              })
            }
          </ul>
        </div>
       <div className = "notesFooter" >
         <NoteForm addNote={this.addNote}></NoteForm>
       </div>
      </div>
    )
  }
  
}

export default App;
