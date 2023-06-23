import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Dish } from '../pages/Dish';
import { AddDish } from '../pages/AddDish';
import { EditDish } from '../pages/EditDish';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dish/:id" element={<Dish />} />
            <Route path="/add" element={<AddDish />} />
            <Route path="/edit/:id" element={<EditDish />} />
        </Routes>
    )
}