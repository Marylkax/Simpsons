import React, { Component } from "react";
import Character from "./Character";
import Search from "./Search";

class Simpsons extends Component {
  render() {
    const { simpsons, onDelete, onLikeToggle, onSearchInput } = this.props;

    return (
      <>
      <Search onSearchInput={onSearchInput}/>
        {simpsons.map((item, index) => {
          return (
            <Character
              item={item}
              key={item.id}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
            />
          );
        })}
      </>
    );
  }
}

export default Simpsons;
