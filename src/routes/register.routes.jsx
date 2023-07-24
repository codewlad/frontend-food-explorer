import { Routes, Route } from 'react-router-dom';

import { AdminRegister } from '../pages/Register';

export function RegisterRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminRegister />} />
        </Routes>
    );
}