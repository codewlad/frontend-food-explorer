import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Dish } from '../pages/Dish';
import { Profile } from '../pages/Profile';
import { Favorites } from '../pages/Favorites';
import { Payment } from '../pages/Payment';

export function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dish/:id" element={<Dish />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
    )
}