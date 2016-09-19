import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

class BoardCardEditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description
        };
    }
    
    add(e) {
        var form = e.target,
            elements = form.elements,
            title = elements.namedItem("title").value,
            description = elements.namedItem("description").value;
        myFirebaseRef.child("boards").push({
            title: title,
            description: description,
            user: userId
        }).then((snapshot) => {
            this.setState({
                title: '',
                description: ''
            });
            form.reset();
        });
        e.preventDefault();
        return false;
    }
    
    render() {
        var { title, description, status } = this.state;
        return (
            <div className="boardCard card blue-grey darken-1">
                <div className="card-content white-text">
                    <form onSubmit={this.add.bind(this)}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input placeholder="Title" id="board_title" type="text" name="title"/>
                                <label htmlFor="board_title" className="active">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input placeholder="Description" id="board_desc" type="text" name="description"></input>
                                <label htmlFor="board_desc" className="active">Description</label>
                            </div>
                        </div>
                        <button className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default BoardCardEditable;