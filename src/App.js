import React from "react";
import NavBar from "./Navbar";
import Emails from "./Emails";
import Compose from "./Compose";
import EmailQuery from "./EmailQuery";
import EmailView from "./EmailView";
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.setStatus = this.setStatus.bind(this);
    this.search = this.search.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    this.state = {
        emails: [],
        searchQuery: [],
        retrieveId: undefined,
        selectedEmail: {},
        status: 'home',
    };
  }

  async componentDidMount(){
    this.getEmails()
  }

  async grabJson(value){

    let result;

    if(typeof value === "number") {
      result = await fetch("http://localhost:3001/emails/" + value);
    } else {
      let url = "http://localhost:3001/search?query=" + value;
      result = await fetch(url);
    }

    let json = await result.json()
    console.log("JSON", json)
    return json;
  }

  async getEmails(){
    let content = await fetch("http://localhost:3001/emails");
    let data = await content.json();
    this.setState({emails: data})
  }

  setStatus(statusUpdate){
    this.setState({status: statusUpdate});
  }

  async search(text){
    let data = await this.grabJson(text)
    if(data.length === 0) return this.setStatus('home')

    this.setState({searchQuery: data});
    this.setStatus('searching')
  }

  async selectEmail(id){
    let data = await this.grabJson(id)
    this.setState({selectedEmail: data})
    this.setStatus("selecting")
  }

  async sendEmail(data){
    fetch("http://localhost:3001/send", {
      method: 'POST',
      headers: {"Content-Type": 'application/json',},
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Error:', error));

    this.setStatus("home");
  }

  render(){
    let result;
    if(this.state.status === 'composing') {result = <Compose length={this.state.emails.length} postDataFunc={this.sendEmail}/>}
    else if(this.state.status === 'searching') {result = <EmailQuery queryObj={this.state.searchQuery} selectorFunc={this.selectEmail}/>}
    else if(this.state.status === "selecting") {result = <EmailView email={this.state.selectedEmail} statusFunc={this.setStatus}/>}
    else if(this.state.status === 'home') {result = <Emails emails={this.state.emails} selectorFunc={this.selectEmail}/>}
    console.log(result)

  return (
    <div className="App">
      <header>
        <NavBar app={this} statusFunc={this.setStatus} searchFunc={this.search}/>
      </header>
      <main>
        {result}
      </main>
    </div>
  );
  }

}

export default App;

// View all of my email messages (subject line + sender)
// View one of my email messages with all of its details
// Send an email
// Search for a specific email by subject
