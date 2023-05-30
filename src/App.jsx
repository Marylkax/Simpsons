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
    //invert if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
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
  };

  onAlphabetList = (e) => {
    this.setState ({alphabetList: e.target.value })
  };
  
  onReset = (e) => {
  //  this.onInitialise();
   this.setState({reset : true});
  }
  //document.getElementbyId("inputbox").reset; seeing if anything would work using a dom manipulation in react, as the react reset method wasn't working
  // Have tried a few different ways of doing the reset button. Through having an onlick event in controls component that causes the intial api request to be pulled, or by trying to render the original data simpsons, rather than the filtered copy. 
  //Have also tried to clear the inputs for search and sort methods. This sends down a blank input to the search and sort in controls. However then the user is unable to use the search/sort again! This currently breaks when using, please refresh page to start over
  
  render() {
     console.log(this.state);

    const { simpsons, searchInput, alphabetList, reset } = this.state;
    //  console.log(simpsons[0].character);

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything!</p>;

    //calculate the total
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
    
    // not manipulating original data, modify the copy

    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Simpsons
          searchInput={reset ? "" : searchInput}
          alphabetList={reset ? "" : alphabetList}
          onReset={this.onReset}
          onSearchInput={this.onSearchInput}
          simpsons={reset ? simpsons : filteredList}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
          onAlphabetList={this.onAlphabetList}
        />
      </>
    );
  }
}

export default App;
