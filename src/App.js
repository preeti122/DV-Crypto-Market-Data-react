import React, { Component } from 'react'
import CardSection from './components/CardSection';
import ChartSection from './components/ChartSection';
import Header from './components/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data:{}
    }
  }
  
  curr = "Solana"

  fetchData = async() => {
    let data = await fetch('https://api.coingecko.com/api/v3/coins/' + this.state.Id)
    let json_data = await data.json()
    this.setState({Id:this.state.Id, Data:json_data}) // must change all comp of state
  }

  handle_Submit = async(event) => {
    await this.setState({ Id: event.target.value, Data: this.state.Data })
    this.fetchData()
  }
  componentDidMount(){
    this.fetchData()
  }

  render() {
    return (
      <div>
        <Header handle_Submit = {this.handle_Submit}/>

        <CardSection coinName={this.state.Data.name} 
          currentPrice={this.state.Data.market_data ? this.state.Data.market_data.current_price["usd"] : ""}
          mCap24={this.state.Data.market_data ? this.state.Data.market_data.market_cap_change_percentage_24h : ""}
          ath={this.state.Data.market_data ? this.state.Data.market_data.ath.inr : ""} 
          atl={this.state.Data.market_data ? this.state.Data.market_data.ath.inr : ""}
          sentiment={this.state.Data.sentiment_votes_up_percentage} 
          high24={this.state.Data.market_data ? this.state.Data.market_data.high_24h["inr"] : ""}
          low24={this.state.Data.market_data ? this.state.Data.market_data.low_24h["inr"] : ""} />
        <ChartSection Id={this.state.Id}/>
      </div>
    )
  }
}