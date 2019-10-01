import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Layout from '../src/components/layout/Layout'

import searchWeather from '../src/containers/searchWeather/Search'
import Current from '../src/containers/currentWeather/Current'

class App extends Component {
  state = {
    input: ''
  }
  onchangeInputHandler = (event) => {
    console.log("hellow rold")
    let input = this.state.input
    input = event.target.value
    this.setState({ input: input })
    console.log(this.state.input)
  }


  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
            <Route path="/search" component={searchWeather} exact ></Route>
            <Route path='/' component={Current} exact></Route>
          </Switch>
        </Layout>
      </React.Fragment>
    )
  }
}

export default App;
