import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header'
import Sidebar from './components/Sidebar';

import QRCodePage from './pages/qrCode'
import ButtonClick from './pages/buttonClick';
import OpenNewTab from './pages/openNewTab';
import NewTab from './pages/newTab';
import Counter from './pages/counter';
import DragItem from './pages/dragItem';
import MouseHover from './pages/mouseHover';
import OcrCheck from './pages/ocrCheck';
import FileUpload from './pages/fileUpload';
import FileDownload from './pages/fileDownload';
import VerifyCode from './pages/verifyCode';
import ShoppingCart from './pages/shoppingCart';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <div style={{ display: 'flex' }}>

                    {/* Sidebar (Lista à Esquerda) */}
                    <Sidebar />

                    {/* Área de Detalhes à Direita */}
                    <div style={{ flex: 1, padding: '20px' }}>
                        <Routes>
                            {/*
                        <Route path="/audioValidation" element={<AudioValidation />} />
                        <Route path="/browserPrompt" element={<BrowserPrompt />} />
                        <Route path="/checkbox" element={<Checkbox />} />
                        <Route path="/connectTheDots" element={<ConnectTheDots />} />
                        <Route path="/datePicker" element={<DatePicker />} />
                        <Route path="/deleteElements" element={<DeleteElements />} />
                        <Route path="/dropdowns" element={<Dropdowns />} />
                        <Route path="/dynamicLoginText" element={<DynamicLoginText />} />
                        <Route path="/dynamicTable" element={<DynamicTable />} />
                        <Route path="/longClick" element={<LongClick />} />
                        <Route path="/modalPopup" element={<ModalPopup />} />
                        <Route path="/nestedIframes" element={<NestedIframes />} />
                        <Route path="/radioButtons" element={<RadioButtons />} />
                        <Route path="/regex" element={<Regex />} />
                        <Route path="/tableRelativePosition" element={<RelativePositionTable />} />
                        <Route path="/rightClick" element={<RightClick />} />
                        <Route path="/scrollDown" element={<ScrollDown />} />
                        <Route path="/shadowDom" element={<ShadowDom />} />
                        <Route path="/similarPages" element={<SimilarPages />} />
                        <Route path="/svgElements" element={<SvgElements />} />
                        <Route path="/video" element={<VideoPlayback />} />
                        <Route path="/waitMessage" element={<WaitForMessage />} /> */}
                            <Route path="/shoppingCart" element={<ShoppingCart />} />
                            <Route path="/verifyCode" element={<VerifyCode />} />
                            <Route path="/fileDownload" element={<FileDownload />} />
                            <Route path="/counter" element={<Counter />} />
                            <Route path="/dragItem" element={<DragItem />} />
                            <Route path="/mouseHover" element={<MouseHover />} />
                            <Route path="/openNewTab" element={<OpenNewTab />} />
                            <Route path="/ocrCheck" element={<OcrCheck />} />
                            <Route path="/newTab" element={<NewTab />} />
                            <Route path="/qrCode" element={<QRCodePage />} />
                            <Route path="/buttonClick" element={<ButtonClick />} />
                            <Route path="/fileUpload" element={<FileUpload />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
