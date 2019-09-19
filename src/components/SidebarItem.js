import React, { Component } from 'react';
import { removeHTMLTags} from '../helper';

const firebase = require('firebase');

export default class SidebarItem extends Component {
  
  selectNote = (n, i) => {
    this.props.selectNote(n, i)
  }

  deleteNote = (note) => {
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
      this.props.deleteNote(note);
    }
  }
  
  render() {

    const {_index, _note, selectedNoteIndex } = this.props;
    
    if(_note) {
      return (
        <div key={_index}> 
          <div className="sidebar-item-container" selected={selectedNoteIndex===_index}>
            
            <div onClick={() => this.selectNote(_note, _index)}>
              <h3>{_note.title}</h3>
              <p>{removeHTMLTags(_note.body.substring(0, 30) + '...')}</p>
              
            </div>
            <div className="delete-icon" onClick={() => this.deleteNote(_note)}>
                <i className="far fa-trash-alt"></i>
              </div>
          </div>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}
