import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1> PasswordForget </h1>
        <PasswordForgetForm />
    </div>
);

const INITIALS_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIALS_STATE };
    }
    //Promesse d'envoi des infos a l'API FB et reinitialisation du formulaire apres execution de promesse
    onSubmit = (event) => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIALS_STATE });
            })
            .catch((error) => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;
        //Rendu conditionnel pour la soumission d'information
        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input name="email" value={this.state.email} onChange={this.onChange} type="text" placeholder="Adresse mail" />
                <button disabled={isInvalid} type="submit">
                    Reinitialiser le pass
                    </button>
                {error && <p> {error.message} </p>}
            </form>
        );
    }
}

//Implementation d'un lient de Pass
const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}> Mot de passe oublie? </Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };