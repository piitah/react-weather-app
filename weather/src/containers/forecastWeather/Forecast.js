import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreator from '../../store/actions/weather_action'
import Title from '../../components/UI/TitleBar/Title'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudRain, faMap } from '@fortawesome/free-solid-svg-icons';
import classes from '../ForecastWeather/Forecast.module.css'


class SearchWeather extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={['mt-3', classes.weather_card_wrapper].join(' ')}>
                    <div>
                        <div>
                            <Title icon={faMap}>
                                Add new location <br></br>
                                Find a city and click enter
                            </Title>
                        </div>
                    </div>
                    <div className='mt-4' style={{ marginTop: '1rem' }}>
                        {
                            this.props.search.map(element => {
                                return (
                                    <div className={[classes.Weather_card, 'mt-4', 'card'].join(' ')} key={element.id}>
                                        <div className="card-body" >
                                            <div style={{ margin: 'auto', color: '#fff', paddingBottom: '10px' }}>{element.name} , {element.sys.country}</div>
                                            <div className="d-flex flex-row w-100 align-items-center">
                                                <span className=""><FontAwesomeIcon icon={faCloudRain} size="4x"></FontAwesomeIcon></span>
                                                <div className="ml-4 w-50 ">
                                                    <div className="d-flex float-left flex-column">
                                                        <div style={{ color: '#fff' }}>Clouds</div>
                                                        <div style={{ fontWeight: '500' }}>{Math.round(element.main.temp_min)}°C {Math.round(element.main.temp_max)}°C</div>
                                                    </div>
                                                </div>
                                                <div className="w-50">
                                                    <h3 className={[classes.warn_text, 'float-right', 'card-text'].join(' ')}>{Number.parseInt(element.main.temp)}°C</h3>
                                                </div>
                                            </div>
                                            <div style={{ margin: 'auto', color: '#fff', paddingTop: '10px' }}>{element.weather[0].description}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        search: state.weather.searchList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandler: (data) => dispatch(actionCreator.submitSearch(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWeather)
