import React from 'react'
import { myFirebaseRef, user } from '../../globals.js'

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
        user().then((user) => {
            var toPush = {
                title: title,
                description: description,
                user: {}
            };
            toPush.user[user.uid] = user.uid;
            myFirebaseRef.child("boards").push(toPush).then((snapshot) => {
                this.setState({
                    title: '',
                    description: ''
                });
                form.reset();
                elements.item(0).focus();
            });
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
                            <div className="input-field col s12">
                                <input placeholder="Title" id="board_title" type="text" name="title"/>
                                <label htmlFor="board_title" className="active">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
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