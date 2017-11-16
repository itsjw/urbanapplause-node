import React, { Component } from 'react';

class TextInput extends Component {
  handleChange= (e) => {
    this.props.onChange(this.props.name, e.target.value);
  }
  render() {
    const {label, refName, name, idName, className, type, title, value, defaultValue, onChange, errorMsg, validationMsg, placeholder, disabled} = this.props;
    const isError = (errorMsg==true)?true:null;
    var inputComponent =
          <input
            type={type}
            ref={refName}
            id={idName}
            value={value}
            name={name}
            title={title||''}
            onChange={this.handleChange}
            placeholder={placeholder||''}
            className={(errorMsg==false)?'input':'input is-danger '+className}/>;

    if (type=='textarea') {
      inputComponent=
        <textarea
          ref={refName}
          id={idName}
          className={type}
          onChange={this.handleChange}>
        {value}
      </textarea>
    }

    return(
      <div className="field ">
        {label?
        <label className='label ' htmlFor={refName}>{label} </label>
        :''}
        <div className='control is-expanded'>
          {inputComponent}
        </div>
        <div className='help'>
          <span className='input-field-error-msg'>{errorMsg || ''}</span>
          <span className='input-field-validated-msg'>{validationMsg||''}</span>
          <br />
      </div>
    </div>
    )
  }
}

export default TextInput;
