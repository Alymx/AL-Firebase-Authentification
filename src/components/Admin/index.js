import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        //Initialisation de l'ecoute
        this.props.firebase.users().on('value', (snap) => {
            const userObject = snap.val();

            const usersList = Object.keys(userObject).map((key) => ({
                ...userObject[key], uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    render() {
        const { users, loading } = this.state;
        return (
            <div>
                <h1> Admin </h1>
                {loading && <div> Chargement... </div>}

                <UserList users={users} />
            </div>
        );
    }

    componentWillUnmount() {
        //Fermeture de l'ecoute pour eviter les fuites de memoire
        this.props.firebase.users().off();
    }

}

const UserList = ({ users }) => (
    <ul>
        {users.map((user) => (
            <li key={user.id}>
                <span>
                    <strong> ID: </strong> {user.id}
                </span>
                <span>
                    <strong> E-mail: </strong> {user.email}
                </span>
                <span>
                    <strong> Nom: </strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(AdminPage);