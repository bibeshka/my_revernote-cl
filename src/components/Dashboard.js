import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';

const firebase = require('firebase');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      email: null
    };
  }


  //T0do get item for email
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(_usr => {
      if(!_usr)
        this.props.history.push('/login');
      else {
      firebase
        .firestore()
        .collection('notes')
        .where('users', 'array-contains', _usr.email)
        .onSnapshot(serverUpdate => {
          // const notes = serverUpdate.docs.map(_doc => _doc.data());
          const notes = serverUpdate.docs.map(_doc => {
            const data = _doc.data();
            data['id'] = _doc.id
            return data
          });
            this.setState({ notes: notes , email: _usr.email})
          console.log(notes);
          console.log(this.state.email);
          
        });
      }
    })
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note }); 

  //Updating note in the firebase
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  // Adding new note to the firebase
  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        users:[this.state.email]
      });
    const newID = newFromDB.id;
    await this.setState({ note: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }


  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectNote: null })
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  signOutFn = () => {
    firebase.auth().signOut();
  }


  render() {
    return (
      <div className="dashboard-main-container">
        <Sidebar 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes} 
          deleteNote={this.deleteNote} 
          selectNote={this.selectNote} 
          newNote={this.newNote}
          signOutFn={this.signOutFn} />
        {
          this.state.selectedNote ? 
          <Editor 
          selectedNote={this.state.selectedNote} 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          notes={this.state.notes}
          noteUpdate={this.noteUpdate} /> :
          null
        }
      </div>
      
    )
  }
}


