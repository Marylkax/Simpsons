import React, { Component } from 'react';

class Search extends Component {
   
    render() { 
        return (
        <>
        <input onInput={this.props.onSearchInput} type="text"/>
        </>
        );
    }
}
 
export default Search;