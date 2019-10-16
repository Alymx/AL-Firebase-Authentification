import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
    <AuthUserContext.consumer>
        {(authUser) => (
            <div>
                <h1> Account: {authUser.email} </h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.consumer>
);

//Definition de la condition d'acces a la page
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);