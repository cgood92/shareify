import React from 'react'

// Using "Stateless Functional Components"
export default function(props) {
    var { title, description, controllers } = props;
    return (
        <div className="boardCard card blue-grey darken-1">
            <div className="card-content white-text">
                <form onSubmit={controllers.add}>
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
