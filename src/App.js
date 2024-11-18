import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {/* Sidebar (Lista à Esquerda) */}
                <Sidebar />

                {/* Área de Detalhes à Direita */}
                <div style={{ flex: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="/page1" element={<Page1 />} />
                        <Route path="/pages/" element={<Page2 />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
