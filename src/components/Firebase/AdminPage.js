import React from 'react';

import * as ROLES from '../../constants/roles';

const AdminPage = () => (
    <div>
        <h1> Admin </h1>
        <p>
            Zone restreinte! Seuls les admins sont autorises a y acceder...
            </p>
    </div>
);

const condition = (authUser) =>
    authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);
