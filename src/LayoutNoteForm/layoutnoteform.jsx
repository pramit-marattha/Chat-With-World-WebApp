import React, { Component } from 'react';
import './layoutnoteform.css';

class LayoutNoteForm extends Component{

    constructor(props){
        super(props);
        // this.addNote = this.addNote.bind(this);
        //setting up the React state of the component
        this.state = {
            newNote: '',
        };
        this.handleUserInput= this.handleUserInput.bind(this);
        this.writeNote= this.writeNote.bind(this);
    }
    // The value of the text Input
    handleUserInput(e){
        // console.log(this);
        this.setState({
            newNote: e.target.value,
        })
    }

    writeNote(){
        this.props.addNote(this.state.newNote);
        // newNote back to the empty string
        this.setState({
            newNote: '',
        })
    }

    render()
    {
        return (
            <div className="formWrapper">
                <input className="noteInput"
                       placeholder="Share your vision, ideas and poems"
                value = {this.state.newNote}
                onChange={this.handleUserInput}/>
                       <button className="noteButton"
                       onClick={ this.writeNote}>Share It !!</button>
            </div>
        );
    }
}

export default LayoutNoteForm;
