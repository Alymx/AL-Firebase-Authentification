import React from 'react';

import { withAuthorization } from '../Session';

const HomePage = () => (
    <div>
        <h1> Home </h1>
        <p> Pasge d'accueil accessible par tout utilisateur connecte </p>
    </div>
);

const condition = (authUser) => !!authUser; // equivaut a authUser != null

export default withAuthorization(condition)(HomePage);