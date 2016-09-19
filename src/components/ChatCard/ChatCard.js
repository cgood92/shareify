import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

class ChatCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{
                user: 'Person 1',
                message: 'Proin eget tortor risus.'
            },{
                user: 'Person 2',
                message: 'Pellentesque in ipsum id orci porta dapibus.'
            },{
                user: 'Person 3',
                message: 'Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.'
            }]
        };
    }
    
    toggleDisplay(e){
        $(e.target).parents(".chat").toggleClass("hidden");
    }
    
    render() {
        var messages = this.state.messages.map(function(message, index){
            return <li className="collection-item chat__message" key={index}><label>{message.user}</label> {message.message}</li>;
        });
        return (<ul className="chat collection with-header hidden">
            <li className="collection-header" onClick={this.toggleDisplay}>Chat</li>
            {messages}
            <li className="collection-item chat__message">
                <div className="input-field">
                    <i className="material-icons prefix">mode_edit</i>
                    <input id="icon_prefix2" type="text"></input>
                    <label htmlFor="icon_prefix2">Message</label>
                </div>
            </li>
        </ul>);
    }
}

export default ChatCard;