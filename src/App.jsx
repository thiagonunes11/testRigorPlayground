import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage";
import QRCodePage from "./pages/qrCode";
import ButtonClick from "./pages/buttonClick";
import OpenNewTab from "./pages/openNewTab";
import NewTab from "./pages/newTab";
import Counter from "./pages/counter";
import DragItem from "./pages/dragItem";
import MouseHover from "./pages/mouseHover";
import OcrCheck from "./pages/ocrCheck";
import FileUpload from "./pages/fileUpload";
import FileDownload from "./pages/fileDownload";
import VerifyCode from "./pages/verifyCode";
import ShoppingCart from "./pages/shoppingCart";
import WaitForMessage from "./pages/waitMessage";
import DynamicTable from "./pages/dynamicTable";
import TableRelativePosition from "./pages/tableRelativePosition";
import Dropdowns from "./pages/dropdowns";
import VideoPlayer from "./pages/video";
import CheckboxPage from "./pages/checkbox";
import RadioButtons from "./pages/radioButtons";
import RightClick from "./pages/rightClick";
import SimilarPages from "./pages/similarPages";
import SecondVersion from "./pages/similarPages/secondVersion";
import BrowserPrompt from "./pages/browserPrompt";
import LongClick from "./pages/longClick";
import DeleteElements from "./pages/deleteElements";
import AudioValidation from "./pages/audioValidation";
import ConnectTheDots from "./pages/connectTheDots";
import ModalPopup from "./pages/modalPopup";
import ScrollDown from "./pages/scrollDown";
import ScrollSideways from "./pages/scrollSideways";
import Regex from "./pages/regex";
import DynamicLoginText from "./pages/dynamicLoginText";
import SvgElements from "./pages/svgElements";
import ShadowDom from "./pages/shadowDom";
import NestedIframes from "./pages/nestedIframes";
import FirstIframe from "./pages/nestedIframes/firstIframe";
import FirstIframeSecret from "./pages/nestedIframes/firstIframeSecret";
import SecondIframe from "./pages/nestedIframes/secondIframe";
import SecondIframeSecret from "./pages/nestedIframes/secondIframeSecret";
import DdatePicker from "./pages/ddatePicker";
import CameraPage from "./pages/cameraPage";
import EmailValidation from "./pages/emailValidation";
import DivTable from "./pages/divTable";
import WaitImage from "./pages/waitImage";
import TextareaMultiline from "./pages/textareaMultiline";
import Geolocation from "./pages/geolocation";
import PdfPreview from "./pages/pdfPreview";
import Form from "./pages/form";
import ApiPage from "./pages/apiPage";
import ScreenResolution from "./pages/screenResolution";
import OsBrowser from "./pages/osBrowser";
import EmptyPage from "./pages/emptyPage";
import Pseudo from "./pages/pseudo";
import AudioInput from "./pages/audioInput";
import IframeDropdownTest from "./pages/iframeDropdownTest";
import DifferentDropdowns from "./pages/differentDropdowns";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cameraPage" element={<CameraPage />} />
        <Route path="/ddatePicker" element={<DdatePicker />} />
        <Route path="/shadowDom" element={<ShadowDom />} />
        <Route path="/regex" element={<Regex />} />
        <Route path="/svgElements" element={<SvgElements />} />
        <Route path="/nestedIframes" element={<NestedIframes />} />
        <Route path="/dynamicLoginText" element={<DynamicLoginText />} />
        <Route path="/scrollDown" element={<ScrollDown />} />
        <Route path="/scrollSideways" element={<ScrollSideways />} />
        <Route path="/modalPopup" element={<ModalPopup />} />
        <Route path="/connectTheDots" element={<ConnectTheDots />} />
        <Route path="/audioValidation" element={<AudioValidation />} />
        <Route path="/dropdowns" element={<Dropdowns />} />
        <Route path="/BrowserPrompt" element={<BrowserPrompt />} />
        <Route
          path="/tableRelativePosition"
          element={<TableRelativePosition />}
        />
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
        <Route path="/similarPages/secondVersion" element={<SecondVersion />} />
        <Route path="/nestedIframes/firstIframe" element={<FirstIframe />} />
        <Route
          path="/nestedIframes/firstIframesecret"
          element={<FirstIframeSecret />}
        />
        <Route path="/nestedIframes/secondIframe" element={<SecondIframe />} />
        <Route
          path="/nestedIframes/secondIframeSecret"
          element={<SecondIframeSecret />}
        />
        <Route path="/emailValidation" element={<EmailValidation />} />
        <Route path="/divTable" element={<DivTable />} />
        <Route path="/waitImage" element={<WaitImage />} />
        <Route path="/textareaMultiline" element={<TextareaMultiline />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/pdfPreview" element={<PdfPreview />} />
        <Route path="/form" element={<Form />} />
        <Route path="/apiPage" element={<ApiPage />} />
        <Route path="/screenResolution" element={<ScreenResolution />} />
        <Route path="/osBrowser" element={<OsBrowser />} />
        <Route path="/emptyPage" element={<EmptyPage />} />
        <Route path="/pseudo" element={<Pseudo />} />
        <Route path="/audioInput" element={<AudioInput />} />
        <Route path="/iframeDropdownTest" element={<IframeDropdownTest />} />
        <Route path="/differentDropdowns" element={<DifferentDropdowns />} />
      </Routes>
    </Router>
  );
}

export default App;
