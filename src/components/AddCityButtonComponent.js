import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

const AddCityButtonComponent = (props) => {

    const [favoriteCities, setFavoriteCities] = useState([]);

    const AddCityToFavorites = city => {
        if(!favoriteCities.includes(city)){
            setFavoriteCities([...favoriteCities, city]);
        }
    }

    useEffect(() => {
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
    }, [favoriteCities]);

    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem('favoriteCities'));
        if(storedCities){
            setFavoriteCities(storedCities);
        }
    }, [])

    return(
        <>
            <Button
            onClick={() => {
                AddCityToFavorites(props.location)
            }}
            className="btn btn-dark px-5">
            Add City to Favorites</Button>
        </>
    );
}

export default AddCityButtonComponent;