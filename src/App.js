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

    this.composeEmail = this.composeEmail.bind(this);
    this.search = this.search.bind(this);
    this.selectEmail = this.selectEmail.bind(this);

    this.state = {
        emails: [],
        composeEmail: false,
        searchQuery: [],
        searching: undefined,
        retrieveId: undefined,
        selectedEmail: {},
        selected: false,
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

  composeEmail(boolean){
    this.setState({composeEmail: boolean})
  }

  async search(text,boolean){
    let data = await this.grabJson(text)
    this.setState({searchQuery: data});
    this.setState({searching: true})
  }

  async selectEmail(id){
    let data = await this.grabJson(id)
    this.setState({selectedEmail: data})
    this.setState({selected: true})
  }

  render(){
    let result;
    if(this.state.composeEmail) {result = <Compose composeFunc={this.composeEmail}/>}
    else if(this.state.searching) {result = <EmailQuery queryObj={this.state.searchQuery} selectorFunc={this.selectEmail}/>}
    else if(this.state.selected) {result = <EmailView email={this.state.selectedEmail} composeFunc={this.composeEmail}/>}
    else if(!this.state.composeEmail) {result = <Emails emails={this.state.emails} selectorFunc={this.selectEmail}/>}
    console.log(result)

  return (
    <div className="App">
      <header>
        <NavBar app={this} composeFunc={this.composeEmail} searchFunc={this.search}/>
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
