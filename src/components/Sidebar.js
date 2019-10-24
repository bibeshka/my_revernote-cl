import React, { Component } from 'react'
import SidebarItem from './SidebarItem';

export default class Sidebar extends Component {
  
  constructor() {
    super();

    this.state = {
      addingNote: false,
      title: null
    }
  }

  newNoteBtnClick = () => {
    console.log('Clicked');
    this.setState({ addingNote: !this.state.addingNote, title: null });
    
  }

  updateTitle = (txt) => {
    this.setState({ title: txt});
  }

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
    
  }

  selectNote = (n, i) => {
    this.props.selectNote(n, i);
    console.log('Selected');
  }

  deleteNote = (note) => {
    this.props.deleteNote(note);
  }

  render() {

    const { notes, selectNodeIndex } = this.props;

    if(notes) {
      return (
        <div className="sidebar-container">
            <button className="btn btn-bg" onClick={this.newNoteBtnClick}>{this.state.addingNote ? 'Cansel' :'Add note' }</button>
          {
            this.state.addingNote ?
              <div> 
              <input type="text" className="input" placeholder="enter note title" 
                onKeyUp={(e) => this.updateTitle(e.target.value)}/>
              <button className="btn btn-submit btn-bg" onClick={this.newNote}>Submit</button>
              </div> :
              null
          }
          {
            notes.map((_note, _index) => {
              return(
                <div key={_index}>
                  <SidebarItem _note={_note} _index={_index} 
                    selectNodeIndex={selectNodeIndex} selectNote={this.selectNote}
                    deleteNote={this.deleteNote} ></SidebarItem>
                </div> 
              )
            })
          }
          <SidebarItem />
          <button className="btn btn-bg btn-sign-out" onClick={() => this.props.signOutFn()}>Sign out</button>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}
