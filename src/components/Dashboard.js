import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import objects from '../environments.js';

const Dashboard = () => {

    const apiKey = "&appid=" + objects.prod.apiKey;

    const GetCurrentWeather = async (apiKey, city) => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5${apiKey}`);
        const data = await response.json();
        console.log(data);
        console.log(objects.stateCodes);
    }

    useEffect(() => {
        GetCurrentWeather(apiKey, 'Healdsburg');
        console.log(apiKey);
    });

    return (
        <>
            {/* Header/Navigation Section */}
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <h1>the.weather</h1>
                    </Col>
                    <Col xs={6} md={4}>
                        favorites button here
                    </Col>
                    <Col xs={12} md={4}>
                        search bar here
                    </Col>
                </Row>
            </Container>
            {/* Five Day Forecast Section */}
            <Container>
                <Row>
                    {/* dummy column for space */}
                    <Col>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                5 Day Forecast
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Day 1
                            </Col>
                            <Col>
                                Day 2
                            </Col>
                            <Col>
                                Day 3
                            </Col>
                            <Col>
                                Day 4
                            </Col>
                            <Col>
                                Day 5
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            {/* Date and Time Display */}
            <Container>
                <Row>
                    {/* dummy column for space */}
                    <Col>
                    </Col>
                    {/* Sift through the api and see what data you can place in this column(s) below */}
                    <Col>
                        <Row>
                            <Col xs={12}>
                                Find data to fill
                            </Col>
                            <Col xs={12}>
                                Find data to fill
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <p>Currently</p>
                            </Col>
                            <Col>
                                Add city to favorites button
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>98deg</p>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        Santa Rosa, CA
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        (ICON) sunny
                                    </Col>
                                    <Col xs={6}>
                                        <p>time</p>
                                        <p>date</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    {/* dummy column for space */}
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;