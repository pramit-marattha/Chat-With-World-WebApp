import React, { Component } from 'react';
import Note from './Note/note';
import LayoutNoteForm from './LayoutNoteForm/layoutnoteform';
import { DB_CONFIG } from './Config/config';
// import * as firebase from "firebase";
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';


class App extends Component{

    constructor(props){
        super(props);
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.app = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();
        // this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('notes');

        //setting up the React state of the component
        this.state = {
            notes: [
                // {id: 1, noteContent: "Note first"},
                // {id: 2, noteContent: "Note second"},
            ],
        }
    }

    componentWillMount() {

        const previousNote = this.state.notes;

        // Datasnapshot object
        this.database.on('child_added' , snap => {
            previousNote.push({
                id: snap.key,
                noteContent: snap.val().noteContent,

            })

            this.setState({
                notes: previousNote
            })
        })
        this.database.on('child_removed', snap => {
            for (var i = 0; i < previousNote.length; i++) {
                if (previousNote[i].id === snap.key) {
                    previousNote.splice(i, 1);
                }
            }

            this.setState({
                notes: previousNote
            })
        })


    }

    addNote(note) {
        this.database.push().set({noteContent: note});
    //     //pushing the note to the notes array
    //     const previousNote = this.state.notes;
    //     previousNote.push({id: previousNote.length + 1, noteContent: note});
    //     this.setState({
    //         notes: previousNote
    // })
    }


    removeNote(noteId) {
        // console.log("from the parent: " + noteId);
        this.database.child(noteId).remove();
    }


    render()
    {
        return (
            <div className="notesWrapper">
                <div className="notesFooter">
                    <LayoutNoteForm addNote={ this.addNote} />
                </div>

                <div className="notesBody">
                    {
                        this.state.notes.map((note) => {
                            return (
                                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote ={this.removeNote}/>
                            )
                        })
                    }
                </div>
                <div className="notesHeader">
                    <div className="heading">Share your vision, ideas and poems with the world</div>

                </div>
            </div>
        );
    }
}

export default App;
