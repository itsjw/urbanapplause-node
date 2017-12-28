import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return(
      <div className="modal is-active">
        <div className="modal-background" ></div>
        <div className="modal-content" style={{color: 'white'}}>
          {this.props.message}
          <br/>
          {this.props.options.map((option, i) => (
            <button
              className='button'
              value={option}
              onClick={this.props.onRespond}
              key={i}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default Modal;
