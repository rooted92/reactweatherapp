import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import objects from '../environments.js';
import FiveDayComponent from "./FiveDayComponent.js";
import FavoritesButton from './FavoritesButtonComponent.js';
import AddCityButton from "./AddCityButtonComponent.js";
import '../App.css';

import ThunderstormIcon from '../assets/images/lightningCloudIcon.png';
import DrizzleIcon from '../assets/images/rainCloudIcon.png';
import RainIcon from '../assets/images/rainCloudIcon.png';
import SnowIcon from '../assets/images/snowCloudIcon.png';
import AtmosphereIcon from '../assets/images/fogIcon.png';
import ClearIcon from '../assets/images/sunIcon.png';
import CloudsIcon from '../assets/images/cloudIcon.png';
import Sunrise from '../assets/images/sunrise.png';
import Sunset from '../assets/images/sunset.png';

const Dashboard = () => {

    const apiKey = "&appid=" + objects.prod.apiKey;

    const [bgImage, setBgImage] = useState('');
    const [weatherIcons, setWeatherIcons] = useState({
        "Thunderstorm": ThunderstormIcon,
        "Drizzle": DrizzleIcon,
        "Rain": RainIcon,
        "Snow": SnowIcon,
        "Atmosphere": AtmosphereIcon,
        "Clear": ClearIcon,
        "Clouds": CloudsIcon,
        "Sunrise": Sunrise,
        "Sunset": Sunset
    });
    const [cityInput, setCityInput] = useState('');
    const [cityArray, setCityArray] = useState([]);
    const [isArray, setIsArray] = useState(false);
    const [isCityPicked, setIsCityPicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentTemp, setCurrentTemp] = useState(0);
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');

    const [userPosLat, setUserPosLat] = useState(null);
    const [userPosLon, setUserPosLon] = useState(null);

    const [dayOneWeekday, setDayOneWeekday] = useState('');
    const [dayTwoWeekday, setDayTwoWeekday] = useState('');
    const [dayThreeWeekday, setDayThreeWeekday] = useState('');
    const [dayFourWeekday, setDayFourWeekday] = useState('');
    const [dayFiveWeekday, setDayFiveWeekday] = useState('');

    const [dayOneIcon, setDayOneIcon] = useState('');
    const [dayTwoIcon, setDayTwoIcon] = useState('');
    const [dayThreeIcon, setDayThreeIcon] = useState('');
    const [dayFourIcon, setDayFourIcon] = useState('');
    const [dayFiveIcon, setDayFiveIcon] = useState('');

    const [dayOneHighLow, setDayOneHighLow] = useState('');
    const [dayTwoHighLow, setDayTwoHighLow] = useState('');
    const [dayThreeHighLow, setDayThreeHighLow] = useState('');
    const [dayFourHighLow, setDayFourHighLow] = useState('');
    const [dayFiveHighLow, setDayFiveHighLow] = useState('');

    const geolocationAPI = navigator.geolocation;

    const GetUserCoordinates = () => {
        if (!geolocationAPI) {
            setErrorMessage('Geolocation is not available in your browser!');
        } else {
            geolocationAPI.getCurrentPosition((position) => {
                // destructuring object
                const { coords } = position;
                setUserPosLat(coords.latitude);
                setUserPosLon(coords.longitude);
                GetCurrentWeatherForSelectedCity(apiKey, userPosLat, userPosLon);
                GetFiveDayForecast(apiKey, userPosLat, userPosLon);
            }, (error) => {
                setErrorMessage(error);
                console.error(error);
            })
        }
    }

    const GetAvailableCitiesToSearch = async (apiKey, city) => {
        if (!city) {
            setErrorMessage('Please enter a city name!');
            return;
        }

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5${apiKey}`);
        const data = await response.json();
        console.log(data);
        console.log(Array.isArray(data));
        setCityArray([]);
        if (city === '') {
            alert('Please enter city name');
        }
        else if (!Array.isArray(data) || data.length === 0) {
            setErrorMessage('No results found');
            setIsArray(false);
        }
        else if (Array.isArray(data)) {
            setIsArray(true);
            setCityArray(data);
        }
    }

    const GetCurrentWeatherForSelectedCity = async (apiKey, lat, lon) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial${apiKey}`);
        const data = await response.json();
        console.log(data);
        setCurrentTemp(Math.floor(data.main.temp));
        let dateTime = new Date(data.dt * 1000);
        console.log(dateTime)
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        setTime(`${hours}:${minutes}${ampm}`);
        let dateLong = dateTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        setDate(dateLong);
        console.log(data.city);
        let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        console.log(sunriseTime, sunsetTime);
        setSunrise(sunriseTime);
        setSunset(sunsetTime);
        setCityName(data.name);
        setCountryName(data.sys.country);
        setDescription(data.weather[0].description);
        if (data.weather[0].main === 'Atmosphere') {
            setIcon(weatherIcons.Atmosphere);
            setBgImage('atmosphere')
        }
        else if (data.weather[0].main === 'Clear') {
            setIcon(weatherIcons.Clear);
            setBgImage('clear');
        }
        else if (data.weather[0].main === 'Clouds') {
            setIcon(weatherIcons.Clouds);
            setBgImage('clouds');
        }
        else if (data.weather[0].main === 'Drizzle') {
            setIcon(weatherIcons.Drizzle);
            setBgImage('drizzle');
        }
        else if (data.weather[0].main === 'Rain') {
            setIcon(weatherIcons.Rain);
            setBgImage('rain');
        }
        else if (data.weather[0].main === 'Snow') {
            setIcon(weatherIcons.Snow);
            setBgImage('snow');
        }
        else if (data.weather[0].main === 'Thunderstorm') {
            setIcon(weatherIcons.Thunderstorm);
            setBgImage('thunderstorm');
        }
    }

    const GetFiveDayForecast = async (apiKey, lat, lon) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${apiKey}&units=imperial`);
        const data = await response.json();
        console.log(data);
        let keys = Object.keys(weatherIcons);
        console.log(keys);
        console.log(lat, lon);
        console.log(typeof lat);
        data.list.forEach((item, index) => {

            if (index === 3) {
                let dtTxt = item.dt_txt;
                let date = new Date(dtTxt);
                let dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
                setDayOneWeekday(dayOfWeek);
                setDayOneHighLow(`H:${Math.ceil(item.main.temp_max.toString())} L:${Math.floor(item.main.temp_min.toString())}`);
                if (keys.includes(item.weather[0].main)) {
                    setDayOneIcon(weatherIcons[item.weather[0].main]);
                }
            }
            else if (index === 11) {
                let dtTxt = item.dt_txt;
                let date = new Date(dtTxt);
                let dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
                setDayTwoWeekday(dayOfWeek);
                setDayTwoHighLow(`H:${Math.ceil(item.main.temp_max.toString())} L:${Math.floor(item.main.temp_min.toString())}`);
                if (keys.includes(item.weather[0].main)) {
                    setDayTwoIcon(weatherIcons[item.weather[0].main]);
                    console.log(dayTwoIcon)
                }
            }
            else if (index === 19) {
                let dtTxt = item.dt_txt;
                let date = new Date(dtTxt);
                let dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
                setDayThreeWeekday(dayOfWeek);
                setDayThreeHighLow(`H:${Math.ceil(item.main.temp_max.toString())} L:${Math.floor(item.main.temp_min.toString())}`);
                if (keys.includes(item.weather[0].main)) {
                    setDayThreeIcon(weatherIcons[item.weather[0].main]);
                }
            }
            else if (index === 27) {
                let dtTxt = item.dt_txt;
                let date = new Date(dtTxt);
                let dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
                setDayFourWeekday(dayOfWeek);
                setDayFourHighLow(`H:${Math.ceil(item.main.temp_max.toString())} L:${Math.floor(item.main.temp_min.toString())}`);
                if (keys.includes(item.weather[0].main)) {
                    setDayFourIcon(weatherIcons[item.weather[0].main]);
                }
            }
            else if (index === 35) {
                let dtTxt = item.dt_txt;
                let date = new Date(dtTxt);
                let dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
                setDayFiveWeekday(dayOfWeek);
                setDayFiveHighLow(`H:${Math.ceil(item.main.temp_max.toString())} L:${Math.floor(item.main.temp_min.toString())}`);
                if (keys.includes(item.weather[0].main)) {
                    setDayFiveIcon(weatherIcons[item.weather[0].main]);
                }
            }
        })
    }

    useEffect(() => {
        //basic skeleton for geolocation to work (getcurrentposition)
        GetUserCoordinates();

    }, [userPosLat, userPosLon]);


    return (
        <div className={bgImage}>
            <Container className="mainContainer">
                <Row className="d-flex justify-content-between">
                    <Col className="col-7 pt-3">
                        {/* <Container> */}
                        <Row className="d-flex justify-content-between">
                            <Col xs={6} md={4}>
                                <h1 className="titleText">the.weather</h1>
                            </Col>
                            <Col xs={6} md={4} className='d-flex flex-row justify-content-center'>
                                <FavoritesButton />
                            </Col>
                        </Row>
                        {/* </Container> */}
                        {/* <Container> */}
                        <Row>
                            <Col>
                                {
                                    isArray ? <h3>Which city are you looking for?</h3> : errorMessage
                                }
                                <ListGroup className="listGroup">
                                    {
                                        cityArray.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {
                                                        isCityPicked
                                                            ?
                                                            errorMessage
                                                            :
                                                            <ListGroup.Item className="listItem">
                                                                <button
                                                                    onClick={() => {
                                                                        GetCurrentWeatherForSelectedCity(apiKey, item.lat, item.lon);
                                                                        GetFiveDayForecast(apiKey, item.lat, item.lon);
                                                                        setIsCityPicked(!true);
                                                                    }}
                                                                    className="btn">{item.name}, {item.state} {item.country}</button>
                                                            </ListGroup.Item>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                        {/* </Container> */}
                        {/* <Container> */}
                        <Row className="mt-5">
                            <Col>
                                <Row>
                                    <Col xs={'4'}>
                                        <p className="m-0 currentlyTxt">Currently</p>
                                        <p className="currentTemp m-0">{currentTemp}<sup className="letterF">&deg;F</sup></p>
                                    </Col>
                                    <Col xs={'8'}>
                                        <AddCityButton />
                                        <p className="cityTxt">{cityName}, {countryName}</p>
                                        <Row>
                                            <Col className="col-2 p-0 d-flex justify-content-center">
                                                <img className="currentDayIcon" src={icon} alt=''></img>
                                            </Col>
                                            <Col className="col-auto p-0 text-start">
                                                <p className="m-0">{description}</p>
                                            </Col>
                                            <Col className="col-auto p-0 text-end">
                                                <p className="m-0">{time}</p>
                                                <p className="m-0">{date}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {/* </Container> */}
                    </Col>
                    <Col className="col-5 rightColumn">
                        <Row className="mt-3">
                            <Col className="d-flex flex-row justify-content-end">
                                <input
                                    className="searchBar"
                                    type='search'
                                    onChange={(e) => {
                                        setCityInput(e.target.value);
                                    }}

                                    onKeyDown={
                                        e => {
                                            if (e.key === 'Enter') GetAvailableCitiesToSearch(apiKey, cityInput);
                                        }}
                                    placeholder="Enter city" ></input>
                                <button
                                    className="searchButton"
                                    onClick={() => {
                                        GetAvailableCitiesToSearch(apiKey, cityInput);
                                    }}>search</button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                <p style={{ fontSize: '2.25rem' }}>5 Day Forecast</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FiveDayComponent
                                    dayOfWeek={dayOneWeekday}
                                    weatherIcon={dayOneIcon}
                                    highLowTemps={dayOneHighLow}
                                />
                            </Col>
                            <Col>
                                <FiveDayComponent
                                    dayOfWeek={dayTwoWeekday}
                                    weatherIcon={dayTwoIcon}
                                    highLowTemps={dayTwoHighLow}
                                />
                            </Col>
                            <Col>
                                <FiveDayComponent
                                    dayOfWeek={dayThreeWeekday}
                                    weatherIcon={dayThreeIcon}
                                    highLowTemps={dayThreeHighLow}
                                />
                            </Col>
                            <Col>
                                <FiveDayComponent
                                    dayOfWeek={dayFourWeekday}
                                    weatherIcon={dayFourIcon}
                                    highLowTemps={dayFourHighLow}
                                />
                            </Col>
                            <Col>
                                <FiveDayComponent
                                    dayOfWeek={dayFiveWeekday}
                                    weatherIcon={dayFiveIcon}
                                    highLowTemps={dayFiveHighLow}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={6} className='d-flex flex-row justify-content-center'>
                                <div className="sunriseBox d-flex flex-column align-items-center">
                                    <img src={weatherIcons.Sunrise} alt='sunrise icon'></img>
                                    <p>Sunrise: {sunrise}</p>
                                </div>
                            </Col>
                            <Col xs={6} className='d-flex flex-row justify-content-center'>
                                <div className="sunsetBox d-flex flex-column align-items-center">
                                    <img src={weatherIcons.Sunset} alt='sunset icon'></img>
                                    <p>Sunset: {sunset}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;