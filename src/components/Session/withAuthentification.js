import React from 'react';


import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

const withAuthentification = (Component) => {
    class withAuthentification extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({ authUser })
                        : this.setState({ authUser: null });
                },
            );
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component> {this.props} </Component>
                </AuthUserContext.Provider>);
        }

        componentWillUnmount() {
            this.listener();
        }
    }
    return withFirebase(withAuthentification);
};

export default withAuthentification;