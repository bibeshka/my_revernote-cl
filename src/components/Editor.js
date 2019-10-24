import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helper';
import 'react-quill/dist/quill.snow.css';

export default class Editor extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: '',
      title: '',
      email: '',
      id: ''
    };
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    })
  }

  componentDidUpdate = () => {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      })
    } 
  }

  updateBody = async(val) => {
    await this.setState({ text: val });
    this.update();
  };

  updateTitle = async (txt) => {
    await this.setState({ title: txt });
    this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
    
  }, 1500)
  
  render() {

    if(this.props.selectedNote) {
      return (
        <div className="editor-container">
          <div className="edit-icon">
            <i className="fas fa-pen"></i>
          </div>
          <input className="editor-title-input" 
            placeholder="Note title..." 
            value={this.state.title ? this.state.title : ''}
            onChange={(e) => this.updateTitle(e.target.value)} />
          <ReactQuill className="editor-root" onChange={this.updateBody} value={this.state.text} modules={Editor.modules} formats={Editor.formats} />
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}


Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

// Editor.modules = {
//   toolbar: [
//     [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//     [{size: []}],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{'list': 'ordered'}, {'list': 'bullet'}, 
//      {'indent': '-1'}, {'indent': '+1'}],
//     ['link', 'image', 'video'],
//     ['clean']
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   }
// }


// Editor.formats = [
//   'header', 'font', 'size',
//   'bold', 'italic', 'underline', 'strike', 'blockquote',
//   'list', 'bullet', 'indent',
//   'link', 'image', 'video'
// ]
