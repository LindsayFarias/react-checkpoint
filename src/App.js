import React from "react";
import NavBar from "./Navbar";
import Emails from "./Emails";
import Compose from "./Compose";
import EmailView from "./EmailView";
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.composeEmail = this.composeEmail.bind(this);
    this.search = this.search.bind(this);

    this.state = {
        emails: [],
        composeEmail: false,
        searchQuery: [],
        searching: false,
        searchBoxValue: '',
        retrieveId: undefined,
    };
  }
  async componentDidMount(){
    this.getEmails()
  }

  async getEmails(){
    let content = await fetch("http://localhost:3001/emails");
    let data = await content.json();
    console.log(data)
    let emailArray = [];
    for (let i = 0; i < data.length; i++){
      let newEmail = {}
      newEmail.sender = data[i].sender;
      newEmail.subject = data[i].subject;
      newEmail.message = data[i].message;
      newEmail.date = data[i].date;
      newEmail.id = data[i].id;
      emailArray.push(newEmail);
    }
    this.setState({emails: emailArray})
  }

  composeEmail(boolean){
    this.setState({composeEmail: boolean})
  }

  async search(){
    let searchValue = this.state.searchBoxValue;
    let url = "http://localhost:3001/search?query=" + searchValue;
    let result = await fetch(url);
    let data = await result.json();

    let query= {};
    query.sender = data.sender;
    query.subject = data.subject;
    query.message = data.message;
    query.date = data.date;
    query.id = data.id;

    console.log("Searching", searchValue)
    console.log("Data Retrieved", query)
    console.log("Using this url",url)

    let newQuery = [];
    newQuery.push(query)

    this.setState({searchQuery: newQuery})
    this.setState({searching: true})
  }

  render(){
    let result;
    if(this.state.composeEmail) {result = <Compose composeFunc={this.composeEmail}/>}
    if(this.state.searching) {result = <EmailView queryObj={this.state.searchQuery[0]} composeFunc={this.composeEmail}/>}
    if(!this.state.composeEmail) {result = <Emails emails={this.state.emails}/>}
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
