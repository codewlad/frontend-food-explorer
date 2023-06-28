import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import { AuthRoutes } from './auth.routes';
import { AdminRoutes } from './admin.routes';
import { UserRoutes } from './user.routes';

export function Routes() {
    const { user, isAdmin } = useAuth();

    return (
        <BrowserRouter>
            {user ? (isAdmin ? <AdminRoutes /> : <UserRoutes />) : <AuthRoutes />}
        </BrowserRouter>
    );
}