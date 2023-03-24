import React from 'react';
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FiveDayComponent = (props) => {
    return (
        <>
            <Row>
                <Col className='text-center'><p className='m-0'>{props.dayOfWeek}</p></Col>
            </Row>
            <Row>
                <Col className='d-flex flex-row justify-content-center'>
                <img className='fiveDayIcon' src={props.weatherIcon} alt='weather icon'></img>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex flex-row justify-content-center'><p>{props.highLowTemps}</p></Col>
                {/* <Col className='col-6 d-flex flex-row justify-content-start'><p>L:{props.lowTemp}</p></Col> */}
            </Row>
        </>
    );
}

export default FiveDayComponent;