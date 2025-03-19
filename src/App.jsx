import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Navbar } from "react-bootstrap"

import Footer from './components/Footer';
//import Header from './components/Header'
import Sidebar from './components/Sidebar';

import HomePage from './pages/homePage'
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
import WaitForMessage from './pages/waitMessage';
import DynamicTable from './pages/dynamicTable';
import TableRelativePosition from './pages/tableRelativePosition';
import Dropdowns from './pages/dropdowns'
import VideoPlayer from './pages/video';
import CheckboxPage from './pages/checkbox';
import RadioButtons from './pages/radioButtons';
import RightClick from './pages/rightClick';
import SimilarPages from './pages/similarPages';
import SecondVersion from './pages/similarPages/secondVersion';
import BrowserPrompt from './pages/browserPrompt';
import BrowserPromptOnLoad from './pages/browserPromptOnLoad';
import LongClick from './pages/longClick'; 
import DeleteElements from "./pages/deleteElements";
import AudioValidation from './pages/audioValidation';
import ConnectTheDots from './pages/connectTheDots';
import ModalPopup from './pages/modalPopup';
import ScrollDown from './pages/scrollDown';
import DynamicLoginText from './pages/dynamicLoginText';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/*
                <Route path="/audioValidation" element={<AudioValidation />} />
                <Route path="/browserPrompt" element={<BrowserPrompt />} />
                <Route path="/connectTheDots" element={<ConnectTheDots />} />
                <Route path="/datePicker" element={<DatePicker />} />
                <Route path="/deleteElements" element={<DeleteElements />} />
                <Route path="/dynamicLoginText" element={<DynamicLoginText />} />
                <Route path="/longClick" element={<LongClick />} />
                <Route path="/modalPopup" element={<ModalPopup />} />
                <Route path="/nestedIframes" element={<NestedIframes />} />
                <Route path="/regex" element={<Regex />} />
                <Route path="/rightClick" element={<RightClick />} />
                <Route path="/scrollDown" element={<ScrollDown />} />
                <Route path="/shadowDom" element={<ShadowDom />} />
                <Route path="/similarPages" element={<SimilarPages />} />
                <Route path="/svgElements" element={<SvgElements />} />
                */}
                <Route path="/dynamicLoginText" element={<DynamicLoginText />} />
                <Route path="/scrollDown" element={<ScrollDown />} />
                <Route path="/modalPopup" element={<ModalPopup />} />
                <Route path="/connectTheDots" element={<ConnectTheDots />} />
                <Route path="/audioValidation" element={<AudioValidation />} />
                <Route path="/dropdowns" element={<Dropdowns />} />
                <Route path="/BrowserPrompt" element={<BrowserPrompt />} />
                <Route path="/BrowserPromptOnLoad" element={<BrowserPromptOnLoad />} />
                <Route path="/tableRelativePosition" element={<TableRelativePosition />} />
                <Route path="/dynamicTable" element={<DynamicTable />} />
                <Route path="/waitMessage" element={<WaitForMessage />} />
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
                <Route path="/video" element={<VideoPlayer />} />
                <Route path="/checkbox" element={<CheckboxPage />} />
                <Route path="/radioButtons" element={<RadioButtons />} /> 
                <Route path="/rightClick" element={<RightClick />} />
                <Route path="/longClick" element={<LongClick />} />
                <Route path="/deleteElements" element={<DeleteElements />} />
                <Route path="/similarPages" element={<SimilarPages />} />
                <Route path="/similarPages/secondVersion" element={<SecondVersion />}/>
            </Routes>
        </Router>
    );
}

export default App;
