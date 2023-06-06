import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";

class App extends Component {
  state = {};

  async onInitialise() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    );
  

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.setState({ simpsons: data });
  }

  componentDidMount = () => {
    this.onInitialise()

  }
  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    simpsons[indexOf].liked = !simpsons[indexOf].liked; //switches between true and false
    this.setState({ simpsons });
  };

  onDelete = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };
  onSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
    this.setState({ reset: false });
  };

  onAlphabetList = (e) => {
    this.setState ({alphabetList: e.target.value })
    this.setState({ reset: false });
  };
  
  onReset = (e) => {
  //  this.onInitialise();
   this.setState({reset : true});
  }
  render() {
    const { simpsons, searchInput, alphabetList, reset } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything!</p>;

    //calculate the total. in render method because it's disposable, doesnt belong in the state. single source of truth means when char deleted the liked also changes.
 // Data is in sync
    let total = 0;
    simpsons.forEach((char) => {
      if (char.liked) total++;
    });
    let filteredList = [...simpsons];

    if (searchInput){
      filteredList = filteredList.filter((item)=> {
      console.log(item.character);
        if
      (item.character.toLowerCase().includes(searchInput.toLowerCase())) {
          return true;
        }
      }); }

      if (alphabetList === 'asc'){
        filteredList.sort((itemOne, itemTwo) => {
          if (itemOne.character > itemTwo.character) return 1;
          if (itemOne.character < itemTwo.character) return -1;
        })
      } else if (alphabetList === 'desc'){
        filteredList.sort((itemOne, itemTwo) => {
          if (itemOne.character < itemTwo.character) return 1;
          if (itemOne.character > itemTwo.character) return -1;
        })
      }

    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Simpsons
          searchInput={reset ? "" : searchInput}
          alphabetList={reset ? "" : alphabetList}
          onReset={this.onReset}
          onSearchInput={this.onSearchInput}
          simpsons={reset ? simpsons : filteredList}
          onDelete={this.onDelete} // function can now be passed down to Simpsons, then to character. Passed directly  in current scope
          onLikeToggle={this.onLikeToggle}
          onAlphabetList={this.onAlphabetList}
        />
      </>
    );
  }
}

export default App;
