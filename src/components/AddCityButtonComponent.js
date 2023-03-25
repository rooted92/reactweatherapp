import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

const AddCityButtonComponent = () => {
    return(
        <>
            <Button className="btn btn-dark px-5">Add City to Favorites</Button>
        </>
    );
}

export default AddCityButtonComponent;