var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var CONTACTS = {
    0: {
        id: 0,
        name: 'Sarah Hughes',
        phoneNumber: '01234 567890'
    },
    1: {
        id: 1,
        name: 'Tim Taylor',
        phoneNumber: '02345 678901'
    },
    2: {
        id: 2,
        name: 'Sam Smith',
        phoneNumber: '03456 789012'
    }
};

//this Component displays a single contact taken from the object above, uses Link
//to display dynamic links to the keys in the object above
var Contact = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/contacts/' + props.id}>
                    {props.name}
                </Link>
            </strong>
            &nbsp;-
            {props.phoneNumber}
        </div>
    );
};

var App = function(props) {
    return (
        <div>
            <h1>
                Contacts App
            </h1>
            <div>
                {props.children}
            </div>
        </div>
    );
};

//this Components uses .map to iterate over the object (keys) contact object above
var ContactList = function(props) {
    var contacts = Object.keys(props.contacts).map(function(contactId, index) {
        var contact = props.contacts[contactId];
        return (
            <li key={index}>
                <Contact id={contact.id} name={contact.name}
                         phoneNumber={contact.phoneNumber} />
            </li>
        );
    });
    return (
        <ul>
            {contacts}
        </ul>
    );
};

var ContactContainer = function(props) {
    var contact = CONTACTS[props.params.contactId];
    return <Contact id={contact.id} name={contact.name}
                    phoneNumber={contact.phoneNumber} />;
};

//this Component injects contents of the CONTACTS object as a prop into the contactList
var ContactListContainer = function() {
    return <ContactList contacts={CONTACTS} />;
};


//react router defining the route and the component to return
var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ContactListContainer} />
            <Route path=":contactId" component={ContactContainer} />
        </Route>
        <Route path="/contacts" component={App}>
            <IndexRoute component={ContactListContainer} />
            <Route path=":contactId" component={ContactContainer} />
        </Route>
    </Router>
);

//react dom loader, rendering the 'routes', into the 'app' div
document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});