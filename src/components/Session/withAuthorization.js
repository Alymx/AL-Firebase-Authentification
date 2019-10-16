import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
    class WithAuthorization extends React.Component {

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                (authUser) => {
                    if (!condition(authUser)) {
                        //Redirection vers la page de connexion si l'utilisateur n'est pas authentifie
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
            );
        }


        render() {
            return (
                //Definir le client FB et la condition sur le component en parametre pour ne pas afficher ce dernier avant la redirection (meme pas brievement)
                <AuthUserContext.Consumer>
                    {(authUser) =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }

        componentWillUnmount() {
            //Vider la session de FB ouverte
            this.listener();
        }
    }
    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);

};

export default withAuthorization;