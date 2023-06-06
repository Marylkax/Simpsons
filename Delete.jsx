import React, { Component } from "react";

class Delete extends Component {
  render() {
    const { onDelete, id } = this.props;
// console.log(this.props); chechking that it has recieved the prop onDelete
    return (
      <div>
        <button onClick={() => onDelete(id)}>Delete</button> 
        {/* a callback: functions passed through functions. Can call function in the parent, sends data. Uses unique id */}
      </div>
    );
  }
}

export default Delete;
