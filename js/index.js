"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouter = ReactRouter;
var Router = _ReactRouter.Router;
var Route = _ReactRouter.Route;
var IndexRoute = _ReactRouter.IndexRoute;
var Link = _ReactRouter.Link;
var browserHistory = _ReactRouter.browserHistory;

// Init firebase

var myFirebaseRef = new Firebase("https://shareify-6aca2.firebaseio.com/");
var userId = "12345";

/*
 * *************************************** CollectionView **************************************
 */

var CollectionView = function (_React$Component) {
    _inherits(CollectionView, _React$Component);

    function CollectionView(props) {
        _classCallCheck(this, CollectionView);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            title: 'Title coming soon...',
            resources: [],
            id: _this.props.params.collectionId
        };
        myFirebaseRef.child("collections/" + _this.state.id).on("value", function (snapshot) {
            var collection = snapshot.val();
            _this.state.title = collection.title;
        });
        myFirebaseRef.child("resources").orderByChild('collection/' + _this.state.id).equalTo(_this.state.id).on("value", function (snapshot) {
            if (snapshot.exists()) {
                var collection = snapshot.val();
                _this.state.resources = Object.keys(collection).map(function (i) {
                    return collection[i];
                });
                _this.setState(_this.state);
            }
        });
        return _this;
    }

    CollectionView.prototype.render = function render() {
        var _state = this.state;
        var id = _state.id;
        var title = _state.title;
        var resources = _state.resources;
        var collectionId = _state.collectionId;

        var resources = resources.map(function (elem) {
            return React.createElement(ResourceCard, { href: elem.href });
        });
        return React.createElement(
            "section",
            { className: "resourcesView" },
            React.createElement(
                "ul",
                { className: "collection with-header" },
                React.createElement(
                    "li",
                    { className: "collection-header" },
                    React.createElement(
                        "h4",
                        null,
                        title
                    )
                ),
                resources,
                React.createElement(ResourceCardEditable, { collectionId: id })
            )
        );
    };

    return CollectionView;
}(React.Component);

/*
 * *************************************** ResourceCard **************************************
 */

var ResourceCard = function (_React$Component2) {
    _inherits(ResourceCard, _React$Component2);

    function ResourceCard(props) {
        _classCallCheck(this, ResourceCard);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = {
            href: _this2.props.href,
            chat: {}
        };
        return _this2;
    }

    ResourceCard.prototype.render = function render() {
        var href = this.state.href;

        return React.createElement(
            "li",
            { className: "collection-item" },
            React.createElement(
                "a",
                { href: href },
                React.createElement(
                    "div",
                    null,
                    href,
                    React.createElement(
                        "span",
                        { className: "secondary-content" },
                        React.createElement(
                            "i",
                            { className: "material-icons" },
                            "send"
                        )
                    )
                )
            )
        );
    };

    return ResourceCard;
}(React.Component);

/*
 * *************************************** ResourceCardEditable **************************************
 */

var ResourceCardEditable = function (_React$Component3) {
    _inherits(ResourceCardEditable, _React$Component3);

    function ResourceCardEditable(props) {
        _classCallCheck(this, ResourceCardEditable);

        var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

        var collectionId = _this3.props.collectionId;

        _this3.state = {
            collectionId: collectionId
        };
        return _this3;
    }

    ResourceCardEditable.prototype.add = function add(e) {
        var form = e.target,
            elements = form.elements,
            href = elements.namedItem("link").value,
            collectionId = this.state.collectionId;
        var toPush = {
            href: href,
            collection: {},
            user: userId
        };
        toPush.collection[collectionId] = collectionId;
        myFirebaseRef.child("resources").push(toPush).then(function (snapshot) {
            form.reset();
        });
        e.preventDefault();
        return false;
    };

    ResourceCardEditable.prototype.render = function render() {
        return React.createElement(
            "li",
            { className: "collection-item" },
            React.createElement(
                "form",
                { onSubmit: this.add.bind(this) },
                React.createElement("input", { placeholder: "Link", id: "collection_link", type: "text", name: "link" })
            )
        );
    };

    return ResourceCardEditable;
}(React.Component);

/*
 * *************************************** BoardView **************************************
 */

var BoardView = function (_React$Component4) {
    _inherits(BoardView, _React$Component4);

    function BoardView(props) {
        _classCallCheck(this, BoardView);

        var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

        var boardId = _this4.props.params.boardId;
        console.log("New...", boardId);
        _this4.state = {
            collections: [],
            id: boardId
        };
        myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).on("value", function (snapshot) {
            console.log("okie dokey");
            if (snapshot.exists()) {
                console.log("setting state...");
                _this4.state = {
                    collections: Object.keys(snapshot.val()),
                    id: _this4.state.boardId
                };
                _this4.setState(_this4.state);
            }
        });
        return _this4;
    }

    BoardView.prototype.render = function render() {
        var _this5 = this;

        var collections = this.state.collections.map(function (collection) {
            return React.createElement(CollectionCard, { boardId: _this5.state.id, id: collection });
        });
        return React.createElement(
            "section",
            { className: "collectionRow" },
            collections,
            React.createElement(CollectionCardEditable, { boardId: this.state.id })
        );
    };

    return BoardView;
}(React.Component);

/*
 * *************************************** CollectionCard **************************************
 */

var CollectionCard = function (_React$Component5) {
    _inherits(CollectionCard, _React$Component5);

    function CollectionCard(props) {
        _classCallCheck(this, CollectionCard);

        var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

        _this6.state = {
            title: "Title coming...",
            author: "Author coming...",
            description: "Description coming...",
            boardId: _this6.props.boardId,
            id: _this6.props.id
        };
        myFirebaseRef.child("collections").child(_this6.state.id).on("value", function (snapshot) {
            if (snapshot.exists()) {
                var collection = snapshot.val();
                _this6.state = {
                    title: collection.title,
                    author: collection.author,
                    description: collection.description,
                    id: _this6.state.id,
                    boardId: _this6.state.boardId
                };
                _this6.setState(_this6.state);
            }
        });
        return _this6;
    }

    CollectionCard.prototype.render = function render() {
        var _state2 = this.state;
        var id = _state2.id;
        var boardId = _state2.boardId;
        var title = _state2.title;
        var author = _state2.author;
        var description = _state2.description;

        return React.createElement(
            "div",
            { className: "collectionCard card blue-grey darken-1" },
            React.createElement(
                "div",
                { className: "card-content white-text" },
                React.createElement(
                    Link,
                    { to: "/" + boardId + "/" + id },
                    React.createElement(
                        "div",
                        { className: "collectionCard__title card-title grey-text" },
                        title
                    )
                ),
                React.createElement(
                    "div",
                    { className: "collectionCard__author blue-grey-text" },
                    "Shared by ",
                    author
                ),
                React.createElement(
                    "p",
                    { className: "collectionCard__description" },
                    description
                ),
                React.createElement(ChatCard, null)
            )
        );
    };

    return CollectionCard;
}(React.Component);

/*
 * *************************************** CollectionCardEditable **************************************
 */

var CollectionCardEditable = function (_React$Component6) {
    _inherits(CollectionCardEditable, _React$Component6);

    function CollectionCardEditable(props) {
        _classCallCheck(this, CollectionCardEditable);

        var _this7 = _possibleConstructorReturn(this, _React$Component6.call(this, props));

        _this7.state = {
            title: props.title,
            description: props.description
        };
        return _this7;
    }

    CollectionCardEditable.prototype.add = function add(e) {
        var _this8 = this;

        var form = e.target,
            elements = form.elements,
            title = elements.namedItem("title").value,
            description = elements.namedItem("description").value;
        var boardId = this.props.boardId;
        var toPush = {
            title: title,
            description: description,
            board: {}
        };
        toPush.board[boardId] = boardId;
        myFirebaseRef.child("collections").push(toPush).then(function (snapshot) {
            _this8.setState({
                title: '',
                description: ''
            });
            form.reset();
        });
        e.preventDefault();
        return false;
    };

    CollectionCardEditable.prototype.render = function render() {
        var _state3 = this.state;
        var title = _state3.title;
        var description = _state3.description;
        var status = _state3.status;

        return React.createElement(
            "div",
            { className: "collectionCard card blue-grey darken-1" },
            React.createElement(
                "div",
                { className: "card-content white-text" },
                React.createElement(
                    "form",
                    { onSubmit: this.add.bind(this) },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "input-field col s6" },
                            React.createElement("input", { placeholder: "Title", id: "collection_title", type: "text", name: "title" }),
                            React.createElement(
                                "label",
                                { "for": "collection_title", className: "active" },
                                "Title"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "input-field col s6" },
                            React.createElement("input", { placeholder: "Description", id: "collection_desc", type: "text", name: "description" }),
                            React.createElement(
                                "label",
                                { "for": "collection_desc", className: "active" },
                                "Description"
                            )
                        )
                    ),
                    React.createElement(
                        "button",
                        { className: "btn-floating btn-large waves-effect waves-light red" },
                        React.createElement(
                            "i",
                            { className: "material-icons" },
                            "add"
                        )
                    )
                )
            )
        );
    };

    return CollectionCardEditable;
}(React.Component);

/*
 * *************************************** ChatCard **************************************
 */

var ChatCard = function (_React$Component7) {
    _inherits(ChatCard, _React$Component7);

    function ChatCard(props) {
        _classCallCheck(this, ChatCard);

        var _this9 = _possibleConstructorReturn(this, _React$Component7.call(this, props));

        _this9.state = {
            messages: [{
                user: 'Person 1',
                message: 'Proin eget tortor risus.'
            }, {
                user: 'Person 2',
                message: 'Pellentesque in ipsum id orci porta dapibus.'
            }, {
                user: 'Person 3',
                message: 'Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.'
            }]
        };
        return _this9;
    }

    ChatCard.prototype.toggleDisplay = function toggleDisplay(e) {
        $(e.target).parents(".chat").toggleClass("hidden");
    };

    ChatCard.prototype.render = function render() {
        var messages = this.state.messages.map(function (message) {
            return React.createElement(
                "li",
                { className: "collection-item chat__message" },
                React.createElement(
                    "label",
                    null,
                    message.user
                ),
                " ",
                message.message
            );
        });
        return React.createElement(
            "ul",
            { className: "chat collection with-header hidden" },
            React.createElement(
                "li",
                { className: "collection-header", onClick: this.toggleDisplay },
                "Chat"
            ),
            messages,
            React.createElement(
                "li",
                { className: "collection-item chat__message" },
                React.createElement(
                    "div",
                    { className: "input-field" },
                    React.createElement(
                        "i",
                        { className: "material-icons prefix" },
                        "mode_edit"
                    ),
                    React.createElement("input", { id: "icon_prefix2", type: "text" }),
                    React.createElement(
                        "label",
                        { "for": "icon_prefix2" },
                        "Message"
                    )
                )
            )
        );
    };

    return ChatCard;
}(React.Component);

/*
 * *************************************** HomeView **************************************
 */

var HomeView = function (_React$Component8) {
    _inherits(HomeView, _React$Component8);

    function HomeView(props) {
        _classCallCheck(this, HomeView);

        var _this10 = _possibleConstructorReturn(this, _React$Component8.call(this, props));

        _this10.state = {
            boards: []
        };
        myFirebaseRef.child("boards").orderByChild("user").equalTo(userId).on("value", function (snapshot) {
            if (snapshot.exists()) {
                var boards = snapshot.val();
                _this10.state.boards = Object.keys(boards);
                _this10.setState(_this10.state);
            } else {
                _this10.state.boards = [];
                _this10.setState(_this10.state);
            }
        });
        return _this10;
    }

    HomeView.prototype.render = function render() {
        var boards = this.state.boards.map(function (boardId) {
            return React.createElement(BoardCard, { id: boardId });
        });
        return React.createElement(
            "section",
            { className: "home" },
            boards,
            React.createElement(BoardCardEditable, null)
        );
    };

    return HomeView;
}(React.Component);

/*
 * *************************************** BoardCard **************************************
 */

var BoardCard = function (_React$Component9) {
    _inherits(BoardCard, _React$Component9);

    function BoardCard(props) {
        _classCallCheck(this, BoardCard);

        var _this11 = _possibleConstructorReturn(this, _React$Component9.call(this, props));

        _this11.state = {
            title: "Title coming...",
            author: "Author coming...",
            description: "Description coming...",
            id: _this11.props.id
        };
        var id = _this11.state.id;
        myFirebaseRef.child("boards/" + id).on("value", function (snapshot) {
            if (snapshot.exists()) {
                var board = snapshot.val();
                _this11.state = {
                    title: board.title,
                    author: board.author,
                    description: board.description,
                    id: _this11.state.id
                };
                _this11.setState(_this11.state);
            }
        });
        return _this11;
    }

    BoardCard.prototype.remove = function remove(e) {
        // Remove board from DB
        myFirebaseRef.child("boards/" + this.state.id).remove(function () {});
    };

    BoardCard.prototype.render = function render() {
        var _state4 = this.state;
        var id = _state4.id;
        var title = _state4.title;
        var author = _state4.author;
        var description = _state4.description;

        return React.createElement(
            "div",
            { className: "boardCard card blue-grey darken-1" },
            React.createElement(
                "div",
                { className: "card-content white-text" },
                React.createElement(
                    "span",
                    { className: "right card__editCont activator" },
                    React.createElement(
                        "i",
                        { className: "material-icons" },
                        "more_vert"
                    )
                ),
                React.createElement(
                    Link,
                    { to: "/" + id },
                    React.createElement(
                        "div",
                        { className: "boardCard__title card-title grey-text" },
                        title
                    )
                ),
                React.createElement(
                    "div",
                    { className: "boardCard__author blue-grey-text" },
                    "Shared by ",
                    author
                ),
                React.createElement(
                    "p",
                    { className: "boardCard__description" },
                    description
                ),
                React.createElement(ChatCard, null)
            ),
            React.createElement(
                "div",
                { className: "card-reveal" },
                React.createElement(
                    "span",
                    { className: "card-title grey-text text-darken-4" },
                    title,
                    React.createElement(
                        "i",
                        { className: "material-icons right" },
                        "close"
                    )
                ),
                React.createElement(
                    "ul",
                    { className: "editOptions" },
                    React.createElement(
                        "li",
                        { onClick: this.remove.bind(this) },
                        "Delete",
                        React.createElement(
                            "i",
                            { className: "material-icons left" },
                            "close"
                        )
                    )
                )
            )
        );
    };

    return BoardCard;
}(React.Component);

/*
 * *************************************** BoardCardEditable **************************************
 */

var BoardCardEditable = function (_React$Component10) {
    _inherits(BoardCardEditable, _React$Component10);

    function BoardCardEditable(props) {
        _classCallCheck(this, BoardCardEditable);

        var _this12 = _possibleConstructorReturn(this, _React$Component10.call(this, props));

        _this12.state = {
            title: props.title,
            description: props.description
        };
        return _this12;
    }

    BoardCardEditable.prototype.add = function add(e) {
        var _this13 = this;

        var form = e.target,
            elements = form.elements,
            title = elements.namedItem("title").value,
            description = elements.namedItem("description").value;
        myFirebaseRef.child("boards").push({
            title: title,
            description: description,
            user: userId
        }).then(function (snapshot) {
            _this13.setState({
                title: '',
                description: ''
            });
            form.reset();
        });
        e.preventDefault();
        return false;
    };

    BoardCardEditable.prototype.render = function render() {
        var _state5 = this.state;
        var title = _state5.title;
        var description = _state5.description;
        var status = _state5.status;

        return React.createElement(
            "div",
            { className: "boardCard card blue-grey darken-1" },
            React.createElement(
                "div",
                { className: "card-content white-text" },
                React.createElement(
                    "form",
                    { onSubmit: this.add.bind(this) },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "input-field col s6" },
                            React.createElement("input", { placeholder: "Title", id: "board_title", type: "text", name: "title" }),
                            React.createElement(
                                "label",
                                { "for": "board_title", className: "active" },
                                "Title"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "input-field col s6" },
                            React.createElement("input", { placeholder: "Description", id: "board_desc", type: "text", name: "description" }),
                            React.createElement(
                                "label",
                                { "for": "board_desc", className: "active" },
                                "Description"
                            )
                        )
                    ),
                    React.createElement(
                        "button",
                        { className: "btn-floating btn-large waves-effect waves-light red" },
                        React.createElement(
                            "i",
                            { className: "material-icons" },
                            "add"
                        )
                    )
                )
            )
        );
    };

    return BoardCardEditable;
}(React.Component);

var MainLayout = React.createClass({
    displayName: "MainLayout",

    render: function render() {
        var _props$params = this.props.params;
        var boardId = _props$params.boardId;
        var collectionId = _props$params.collectionId;

        var breadcrumbs = React.createElement(
            "ul",
            { id: "nav-mobile", className: "right hide-on-med-and-down" },
            React.createElement(
                "li",
                null,
                React.createElement(
                    Link,
                    { to: "/" },
                    "Home"
                )
            ),
            boardId ? React.createElement(
                "li",
                null,
                React.createElement(
                    Link,
                    { to: "/" + boardId },
                    boardId
                )
            ) : null,
            collectionId ? React.createElement(
                "li",
                null,
                React.createElement(
                    Link,
                    { to: "/" + boardId + '/' + collectionId },
                    collectionId
                )
            ) : null
        );
        return React.createElement(
            "div",
            { className: "app" },
            React.createElement(
                "nav",
                null,
                React.createElement(
                    "div",
                    { className: "nav-wrapper blue-grey darken-4" },
                    React.createElement(
                        Link,
                        { to: "/", className: "brand-logo" },
                        "Shareify"
                    ),
                    breadcrumbs
                )
            ),
            React.createElement(
                "main",
                null,
                this.props.children
            )
        );
    }
});

$(document).ready(function () {
    // Initialize router
    ReactDOM.render(React.createElement(
        Router,
        null,
        React.createElement(
            Route,
            { path: "/", component: MainLayout },
            React.createElement(IndexRoute, { component: HomeView }),
            React.createElement(Route, { path: ":boardId/:collectionId", component: CollectionView }),
            React.createElement(Route, { path: ":boardId", component: BoardView })
        )
    ), document.getElementById('app'), function () {});
});