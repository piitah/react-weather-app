import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreator from '../../store/actions/weather_action'
import Title from '../../components/UI/TitleBar/Title'
import logo from '../../assets/img/09d.svg'

import { faMap } from '@fortawesome/free-solid-svg-icons';
import classes from '../searchWeather/Search.module.css'


class SearchWeather extends Component {
    state = {
        input: '',
    }

    onchangeInputHandler = (event) => {
        let input = this.state.input
        input = event.target.value
        this.setState({ input: input })
    }
    render() {
        let result = this.props.search.map(element => {
            return (
                <div className={[classes.Weather_card, 'mt-4', 'card'].join(' ')} key={element.id} onClick={(event) => { event.preventDefault(); this.props.addToSave(element.id) }}>
                    <div className="card-body" style={{ cursor: 'pointer', boxSizing: 'border-box' }}>
                        <div style={{ margin: 'auto', color: '#fff', paddingBottom: '10px' }}>{element.name} , {element.sys.country}</div>
                        <div className="d-flex flex-row w-100 align-items-center">
                            <img src={logo} alt="weather" width="60px" height="60px" style={{ margin: '0px' }}></img>
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
        if (this.props.error) {
            result = <div className={[classes.Weather_card, 'mt-4', 'card'].join(' ')}>
                <div className="card-body" >
                    <h2 style={{ color: '#fff' }}>Not Found</h2>
                </div>
            </div>
        }
        return (
            <React.Fragment>
                <div className={classes.bg1}>
                    &nbsp;
                    <div className={['mt-', classes.weather_card_wrapper].join(' ')} >
                        <div>
                            <div>
                                <Title icon={faMap}>
                                    Add new location <br></br>
                                    Find a city and click enter
                            </Title>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={(e) => { e.preventDefault(); this.props.onSubmitHandler(this.state.input) }}>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        onChange={this.onchangeInputHandler} value={this.state.input}
                                        placeholder="search for city"
                                        className={['form-control', classes.wpper_card].join(' ')}
                                        required="required">
                                    </input>
                                    <div className="input-group-append">
                                        <button type="submit" className="btn" style={{ backgroundColor: 'rgba(2, 59, 81, 0.795)', color: '#fff' }}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            !this.props.loading ? <div className='mt-4' style={{ marginTop: '1rem' }}>

                                {result}

                            </div> : <div className={[classes.Weather_card, 'mt-4', 'card'].join(' ')}>
                                    <div className="card-body" >
                                        <div className={classes.loading} style={{ margin: 'auto' }}></div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        search: state.weather.searchList,
        loading: state.weather.loading,
        error: state.weather.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandler: (data) => dispatch(actionCreator.submitSearch(data)),
        addToSave: (id) => dispatch(actionCreator.saveSearch(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWeather)
