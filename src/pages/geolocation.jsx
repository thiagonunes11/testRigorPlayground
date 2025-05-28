import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"
import Layout from "../components/Layout";
import axios from "axios";
import { Collapse } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner';

function Geolocation() {
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const getUserLocation = () => {
        setAddress("");
        setLoading(true);
        setUserLatitude(null);
        setUserLongitude(null);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    setUserLatitude(latitude);
                    setUserLongitude(longitude);
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
                    const road = response.data.address.road;
                    const suburb = response.data.address.suburb;
                    const city = response.data.address.city;
                    const state = response.data.address.state;
                    const country = response.data.address.country;
                    const postcode = response.data.address.postcode;

                    const addressParts = [road, suburb, city, state, country, postcode];
                    const fullAddress = addressParts.filter(Boolean).join(', ');

                    setAddress(fullAddress || "Address not found");
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching address: ", error);
                });
        }
    }, [userLatitude]);

    return (
        <Layout
            title="Geolocation"
            description="Click the button to receive a geolocation request. After, the latitude and longitude will be displayed."
        >
            <Container className="mt-5 d-flex justify-content-center align-items-center">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                        <div className="d-flex flex-column align-items-center">

                            <Button
                                id="clickableButton"
                                className="btn-modern mb-3"
                                onClick={getUserLocation}
                                disabled={loading}
                            >
                                Request location
                                {loading && (
                                    <>
                                        <Spinner animation="border" size="sm" className="ms-2" />
                                    </>
                                )}
                            </Button>

                            <Collapse in={address !== ""}>
                                <div id="textElement" className="card w-100 shadow-sm mt-4">
                                    <div className="card-body p-4">
                                        <div>
                                            <strong>Latitude:</strong> {userLatitude}
                                        </div>
                                        <div>
                                            <strong>Longitude:</strong> {userLongitude}
                                        </div>
                                        <div>
                                            <strong>Address:</strong> {address}
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Geolocation;