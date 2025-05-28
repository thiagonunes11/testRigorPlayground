import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"
import Layout from "../components/Layout";
import axios from "axios";

function Geolocation() {
    const [isVisible, setIsVisible] = useState(false);
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [address, setAddress] = useState("");

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

    useEffect(() => {
        if (userLatitude !== null || userLongitude !== null) {
            var queryURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLatitude}&lon=${userLongitude}&zoom=18&addressdetails=1`

            axios.get(queryURL)
                .then((response) => {
                    const addressData = response.data.display_name;
                    setAddress(addressData);
                })
                .catch((error) => {
                    console.error("Error fetching address: ", error);
                });
        }
    }, [userLatitude]);

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
                                <Row>
                                    <Col>
                                        Address: {address}
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