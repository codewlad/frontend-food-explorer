import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import { AuthRoutes } from './auth.routes';
import { AdminRoutes } from './admin.routes';
import { UserRoutes } from './user.routes';

export function Routes() {
    const { user, isAdmin, isLoading } = useAuth();
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setAuthLoaded(true);
        };
    }, [isLoading]);

    if (!authLoaded) {
        return (
            <div></div>
            /*
            <div className='loading'>
                <div>
                    <div id="circular3dG">
                        <div id="circular3d_1G" className="circular3dG"></div>
                        <div id="circular3d_2G" className="circular3dG"></div>
                        <div id="circular3d_3G" className="circular3dG"></div>
                        <div id="circular3d_4G" className="circular3dG"></div>
                        <div id="circular3d_5G" className="circular3dG"></div>
                        <div id="circular3d_6G" className="circular3dG"></div>
                        <div id="circular3d_7G" className="circular3dG"></div>
                        <div id="circular3d_8G" className="circular3dG"></div>
                    </div>
                </div>
                <span>Carregando...</span>
            </div>
            */
        )
    };

    return (
        <BrowserRouter>
            {user ? (isAdmin ? <AdminRoutes /> : <UserRoutes />) : <AuthRoutes />}
        </BrowserRouter>
    );
}