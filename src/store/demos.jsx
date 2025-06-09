import React from 'react';
import {
    MicFill,
    BoxArrowInRight,
    CheckCircleFill,
    CameraFill,
    CheckSquareFill,
    Pencil,
    PlusCircleFill,
    CalendarDateFill,
    TrashFill,
    ArrowDownUp,
    CaretDownFill,
    BoxArrowInLeft,
    Table,
    FileEarmarkArrowDownFill,
    FileEarmarkArrowUpFill,
    ClockFill,
    ExclamationCircleFill,
    MouseFill,
    FileEarmarkTextFill,
    EyeFill,
    BoxArrowUpRight,
    QrCode,
    RecordCircleFill,
    Search,
    Mouse2Fill,
    CartFill,
    Files,
    EnvelopeFill,
    CollectionFill,
    PlayCircleFill,
    ShieldFill,
    HourglassSplit,
    GeoAltFill
} from 'react-bootstrap-icons';

const iconSize = 32;

const demos = [
    {
        title: "Audio Validation",
        path: "/audioValidation",
        description: "Record and check if the audios match.",
        icon: <MicFill size={iconSize} />
    },
    {
        title: "Browser Prompt",
        path: "/browserPrompt",
        description: "Enter values to prompts.",
        icon: <BoxArrowInRight size={iconSize} />
    },
    {
        title: "Button Click",
        path: "/buttonClick",
        description: "Click the button to reveal the hidden text.",
        icon: <CheckCircleFill size={iconSize} />
    },
    {
        title: "Camera",
        path: "/cameraPage",
        description: "Use your computer as if it were a camera",
        icon: <CameraFill size={iconSize} />
    },
    {
        title: "Checkbox",
        path: "/checkbox",
        description: "Click on any of the checkboxes.",
        icon: <CheckSquareFill size={iconSize} />
    },
    {
        title: "Connect the Dots",
        path: "/connectTheDots",
        description: "Click and drag in a canvas.",
        icon: <Pencil size={iconSize} />
    },
    {
        title: "Counter",
        path: "/counter",
        description: "Simple Counter.",
        icon: <PlusCircleFill size={iconSize} />
    },
    {
        title: "Date Picker",
        path: "/ddatePicker",
        description: "Choose a date on a date picker.",
        icon: <CalendarDateFill size={iconSize} />
    },
    {
        title: "Delete Elements",
        path: "/deleteElements",
        description: "Dynamic page to delete elements.",
        icon: <TrashFill size={iconSize} />
    },
    {
        title: "Div Table",
        path: "/divTable",
        description: "A table built using div elements.",
        icon: <Table size={iconSize} />
    },
    {
        title: "Drag Item",
        path: "/dragItem",
        description: "Drag the items to change its order.",
        icon: <ArrowDownUp size={iconSize} />
    },
    {
        title: "Dropdowns",
        path: "/dropdowns",
        description: "Different dropdowns and selects.",
        icon: <CaretDownFill size={iconSize} />
    },
    {
        title: "Dynamic Login Text",
        path: "/dynamicLoginText",
        description: "Press to login with changing button text.",
        icon: <BoxArrowInLeft size={iconSize} />
    },
    {
        title: "Dynamic Table",
        path: "/dynamicTable",
        description: "A table with rows that changes order.",
        icon: <Table size={iconSize} />
    },
    {
        title: "File Download",
        path: "/fileDownload",
        description: "Download a file.",
        icon: <FileEarmarkArrowDownFill size={iconSize} />
    },
    {
        title: "File Upload",
        path: "/fileUpload",
        description: "Upload a file using the input field.",
        icon: <FileEarmarkArrowUpFill size={iconSize} />
    },
    {
        title: "Geolocation",
        path: "/geolocation",
        description: "Get the coordinates of the user.",
        icon: <GeoAltFill size={iconSize} />
    },
    {
        title: "Long Click",
        path: "/longClick",
        description: "Long click button.",
        icon: <ClockFill size={iconSize} />
    },
    {
        title: "Modal Popup",
        path: "/modalPopup",
        description: "Open a modal popup.",
        icon: <ExclamationCircleFill size={iconSize} />
    },
    {
        title: "Mouse Hover",
        path: "/mouseHover",
        description: "Hover the mouse over a button.",
        icon: <MouseFill size={iconSize} />
    },
    {
        title: "Nested Iframes",
        path: "/nestedIframes",
        description: "Inspect and interact with nested iframes.",
        icon: <FileEarmarkTextFill size={iconSize} />
    },
    {
        title: "OCR Check",
        path: "/ocrCheck",
        description: "Check the contents with OCR.",
        icon: <EyeFill size={iconSize} />
    },
    {
        title: "Open New Tab",
        path: "/openNewTab",
        description: "Open a new tab with a click.",
        icon: <BoxArrowUpRight size={iconSize} />
    },
    {
        title: "QR Code",
        path: "/qrCode",
        description: "Generate a QR Code and validate its content.",
        icon: <QrCode size={iconSize} />
    },
    {
        title: "Radio Buttons",
        path: "/radioButtons",
        description: "Check a radio button to select an option.",
        icon: <RecordCircleFill size={iconSize} />
    },
    {
        title: "Regex",
        path: "/regex",
        description: "Find text using RegEx.",
        icon: <Search size={iconSize} />
    },
    {
        title: "Relative Position Table",
        path: "/tableRelativePosition",
        description: "A table to use math and relative location to solve questions.",
        icon: <Table size={iconSize} />
    },
    {
        title: "Right Click",
        path: "/rightClick",
        description: "Right click a button.",
        icon: <Mouse2Fill size={iconSize} />
    },
    {
        title: "Scroll Down",
        path: "/scrollDown",
        description: "Scroll down to find a text.",
        icon: <ArrowDownUp size={iconSize} />
    },
    {
        title: "Shadow DOM",
        path: "/shadowDom",
        description: "Different implementations of shadow DOMs.",
        icon: <Files size={iconSize} />
    },
    {
        title: "Shopping Cart",
        path: "/shoppingCart",
        description: "A simple online shopping page.",
        icon: <CartFill size={iconSize} />
    },
    {
        title: "Similar Pages",
        path: "/similarPages",
        description: "Two pages with minor differences.",
        icon: <Files size={iconSize} />
    },
    {
        title: "Simulated 2FA",
        path: "/emailValidation",
        description: "Send an auth code to an email address and verify if it matches.",
        icon: <EnvelopeFill size={iconSize} />
    },
    {
        title: "SVG Elements",
        path: "/svgElements",
        description: "Interact with SVG elements.",
        icon: <CollectionFill size={iconSize} />
    },
    {
        title: "Video Playback",
        path: "/video",
        description: "Play a sample video file.",
        icon: <PlayCircleFill size={iconSize} />
    },
    {
        title: "Verify Code",
        path: "/verifyCode",
        description: "Code Verification",
        icon: <ShieldFill size={iconSize} />
    },
    {
        title: "Wait for the Image",
        path: "/waitImage",
        description: "Wait five seconds for the image.",
        icon: <HourglassSplit size={iconSize} />
    },
    {
        title: "Wait for the Message",
        path: "/waitMessage",
        description: "Wait five seconds for the message.",
        icon: <HourglassSplit size={iconSize} />
    },
    {
        title: "Textarea Multiline",
        path: "/textareaMultiline",
        description: "Validate multiline input capabilities.",
        icon: <FileEarmarkTextFill size={iconSize} />
    },
    {
        title:"PDF Preview",
        path:"/pdfPreview",
        description: "Preview a PDF file in the browser.",
        icon: <FileEarmarkTextFill size={iconSize} />
    }
];

export default demos;