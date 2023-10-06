// client/src/App.js

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </BrowserRouter>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
