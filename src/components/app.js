import React, { Component } from 'react';
import axios from 'axios'
import CamperList from "./camper_list"
import MDSpinner from 'react-md-spinner';

export default class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		recentCampers: [],
  		allTimeCampers: [],
  		currentView: 'allTimeCampers'
  	}
  }

  componentWillMount() {
  	// Concurrent Requests + Set State to Response
  	axios.all([this.fetchRecentCampers(),this.fetchAllTimeCampers()])
  	.then(axios.spread((recentCampers, allTimeCampers)=>{
  		this.setState({
        recentCampers:recentCampers.data,
        allTimeCampers:allTimeCampers.data
   		});
  	}));
  }

  fetchRecentCampers() {
  	//Fetch the Recent Campers
  	return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
  }

    fetchAllTimeCampers() {
  	//Fetch the Top Campers
  	return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
  }

  changeView(view) {
    this.setState({currentView:view});
  }

  render() {
    if (!this.state.recentCampers.length && !this.state.allTimeCampers.length){
      return <MDSpinner className="spinner" size={200}/>
    }
    return (
      <div class="heading">
    	<div>
      <div><h2>Leaderboard</h2></div>
      <h4>Viewing {this.state.currentView}</h4>
      </div>
      <button onClick={() => this.changeView('recentCampers')} className="btn btn-primary" id="30Days">Past 30 Days</button>
      <button onClick={() => this.changeView('allTimeCampers')} className="btn btn-warning" id="top">All Time</button>
      <CamperList campers={this.state[this.state.currentView]} />
      </div>
    );
  }
}
