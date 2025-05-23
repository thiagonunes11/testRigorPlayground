import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"
import Layout from "../components/Layout";

function Geolocation() {
    const [isVisible, setIsVisible] = useState(false);
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);


    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    setUserLatitude(latitude);
                    setUserLongitude(longitude);
                    setIsVisible(true);
                },

                (error) => {
                    console.error("Error get user location: ", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    };

    return (
        <Layout
            title="Geolocation"
            description="Click the button to receive an request for geolocation.
            After, the latitude and longitude will be displayed."
        >
            <Container>
                <Row className="mt-5 justify-content-center">
                    <Col xs={12} className="d-flex flex-column align-items-center">
                        <Button
                            id="clickableButton"
                            className="btn-modern"
                            onClick={getUserLocation}
                        >
                            Click this button
                        </Button>

                        {isVisible &&
                            <div
                                id="textElement"
                                className="mt-3"
                            >
                                <Row>
                                    <Col>
                                        Latitude: {userLatitude}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Longitude: {userLongitude}
                                    </Col>
                                </Row>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Geolocation;