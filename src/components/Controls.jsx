import React, { Component } from 'react';

class Controls extends Component {
   
    render() { 
        const {onSearchInput, onAlphabetList} = this.props;
        return (
        <>
        <input onInput={this.props.onSearchInput} type="text"/>
        <select onChange={onAlphabetList}>
        <option value=""></option>
        <option value="asc"> Asc </option>
        <option value="desc">Desc</option>
        </select>
        </>
        );
    }
}
 
export default Controls;