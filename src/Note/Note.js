import React, {Component} from 'react'

class Note extends Component{
    constructor(props){
        super(props)
       this.noteId = props.noteId
       this.noteContent = props.noteContent
    }

    handleRemove(id){
        this.props.removeNote(id)
    }

    render(){
        return(
            < div className = "notesBody my-2 text-center py-1">
                <button className="btn btn-danger btn-sm mt-2" onClick={() => this.handleRemove(this.noteId)}>Delete </button>
                <p className="m-1">{this.noteContent}</p>
            </div>
        )
    }
}

export default Note