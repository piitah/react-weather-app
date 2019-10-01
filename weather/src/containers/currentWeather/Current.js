import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Current.module.css'
import logo from '../../assets/img/09d.svg'

import { faMapMarkerAlt, faMap, faCloudRain, faPlus } from '@fortawesome/free-solid-svg-icons';

import * as actionCreators from '../../store/actions/weather_action'

import Title from '../../components/UI/TitleBar/Title'

class CurrentWeather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: {
                lat: 0,
                lng: 0
            },
            dataInfo: null
        }
        this.getCurrentLocation = this.getCurrentLocation.bind(this)
    }
    getCurrentLocation = async () => {
        let instance = this;
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(DisplayLocationInfo, function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }
        function DisplayLocationInfo(position) {
            let location = {
                ...instance.state.location
            }
            let newLocation = {
                lng: position.coords.longitude,
                lat: position.coords.latitude
            }
            location = newLocation
            instance.setState({
                location: location
            })

            instance.props.getWeather(instance.state.location)
        }
    }
    componentDidMount() {
        this.props.clearSearch()
        this.getCurrentLocation()
        console.log('componentDIdMount')
        console.log(this.props.locationInfo)
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.locationInfo !== nextProps.locationInfo;
    }
    componentDidUpdate(prevProps) {
        if (this.props.locationInfo !== prevProps.locationInfo) {
            console.log('ComponentDidUpdate')
            console.log(this.props.locationInfo)
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className={classes.bg1}>
                    <div className={[classes.weather_card_wrapper, 'mt4'].join(' ')}>
                        <Title icon={faMapMarkerAlt} className='mt-5' size='xs'>
                            Current Location
                        </Title>

                        <div className="" style={{ height: '100%' }}>
                            <div className={[classes.Weather_card, 'card'].join(' ')}>
                                <div className="card-body mt-3 mb-3" style={{ cursor: 'pointer', boxSizing: 'border-box' }}>
                                    <div style={{ margin: 'auto', color: '#fff', paddingBottom: '10px' }}>IKEJA , NG</div>
                                    <div className="d-flex flex-row w-100 align-items-center">
                                        <img src={logo} alt="weather" width="60px" height="60px" style={{ margin: '0px' }}></img>
                                        {/* <span className=""><FontAwesomeIcon icon={faCloudRain} size="3x"></FontAwesomeIcon></span> */}
                                        <div className="ml-4 w-50 ">
                                            <div className="d-flex float-left flex-column">
                                                <div style={{ color: '#fff' }}>Clouds</div>
                                                <div style={{ fontWeight: '500' }}>36°C 40°C</div>
                                            </div>
                                        </div>
                                        <div className="w-50">
                                            <h3 className={[classes.warn_text, 'float-right', 'card-text'].join(' ')}>27°C</h3>
                                        </div>
                                    </div>
                                    <div style={{ margin: 'auto', color: '#fff', paddingTop: '10px' }}>Heavy rainfall</div>
                                </div>
                            </div>
                        </div>

                        <Title icon={faMap} size='xs'>
                            Other Locations
                    </Title>

                        <div>
                            <div className={classes.saved_weather}>
                                You have to saved cities. click the button below to add them.
                        </div>
                            <div className="container mt-4">
                                <Link to={'/search'}>
                                    <FontAwesomeIcon className="m-auto w-100" icon={faPlus} size="2x">helo world</FontAwesomeIcon>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        locationInfo: state.weather.currentLocationInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getWeather: (coords) => dispatch(actionCreators.fetchWeather(coords)),
        clearSearch: () => dispatch(actionCreators.clearSearch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather)
