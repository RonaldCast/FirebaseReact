import React, {Component} from 'react'
import '../App.css'
class NoteForm extends Component{
    constructor(props){
        super(props)
        this.state = {
           
        }
        this.addNote = this.addNote.bind(this)
        this.input = React.createRef();
    }

    addNote(){
        this.props.addNote(this.input.current.value)
        this.input.current.value = ''
    }

    render() {
        return(
            <div className = "input-group form-fixed" >
                <input ref={this.input} type="text" className="form-control" placeholder="Write a note"></input>
                <button className="btn btn-primary btn-success" onClick={this.addNote}>Add Note</button>
            </div>
        )   
    }
}

export default NoteForm




/// ref={input => {this.textInput = input}}