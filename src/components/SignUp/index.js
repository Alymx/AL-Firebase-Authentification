import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

//Arrow de page d'inscription
const SignUpPage = () => (
    <div>
        <h1> SignUp </h1>
        <SignUpForm />
    </div>
);

//Variable d'initialisation de formulaire d'inscription
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

//Classe de gestion des etats du formulaire
class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        };
    }

    onSubmit = (event) => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser) => {
                //Creer un utilisateur dans la RT-DB
                return (
                    this.props.firebase.user(authUser.user.id).set({ username, email, })
                );
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                //Demande d'acces a une autre URL (Home)
                this.props.history.push(ROUTES.HOME);
            })
            .catch((error) => {
                this.setState({ error });
            });

        event.preventDefault();

    };
    //Psychose: Controle de component: Ici on ecoute le changement, on recupere les modifications pour permettre aux inputs de se mettre a jour
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const {
            username, email, passwordOne, passwordTwo, error
        } = this.state;
        //Controle des champs de formulaires
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input name="username" value={username} onChange={this.onChange} type="text" placeholder="Nom Complet" /><br />
                <input name="email" value={email} onChange={this.onChange} type="mail" placeholder="Adresse mail" /><br />
                <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="pass" /><br />
                <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="confirmer pass" /><br />
                <button type="submit" disabled={isInvalid}> Sign Up </button>
                {error && <p> {error.message} </p>}
            </form>
        );
    }

}

const SignUpLink = () => (
    <p>
        Vous n'avez pas de compte? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);
//Appelle le client FB et le Switch pour acceder a une autre URL via la dependance 'compose' qui rend le tout moins verbeux
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };