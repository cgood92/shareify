import React from 'react';

import { Link } from 'react-router'
import BoardCardContainer from '../../containers/BoardCardContainer/BoardCardContainer.js'
import BoardCardEditable from '../../BoardCardEditable/BoardCardEditable.js'

// Using "Stateless Functional Components"
export default function(props) {
    var { boards, loggedIn } = props;
    boards = boards.map((board) => {
        return <BoardCardContainer {...board}/>;
    });
    var boardSection = (loggedIn) ? <section className="home__boards">
            <h1 className="title">Boards</h1>
            {boards}
            <BoardCardEditable/>
        </section> : null;
    return (<section className="home">
        {(loggedIn) ? boardSection :
            <section className="home__loggedOut">
                It looks like you have not signed in yet, so your home screen will be empty.  If you want to create an account or log into an existing account, please visit the <Link to="/login">Login Page</Link>.
            </section>
        }
    </section>);
}