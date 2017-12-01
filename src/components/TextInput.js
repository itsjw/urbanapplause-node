import React, { Component } from 'react';

class TextInput extends Component {
  handleChange= (e) => {
    this.props.onChange(this.props.name, e.target.value);
  }
  render() {
    const {label, refName, name, idName, className, type, title, value, defaultValue, onChange, errorMsg, validationMsg, placeholder, disabled, icon} = this.props;
    var didError = null;
    var isValidated = null;
    if(errorMsg && errorMsg.length>0){
      didError= true;
    }
    if (validationMsg && validationMsg.length>0){
      isValidated = true;
    }
    var inputComponent =
          <input
            type={type}
            ref={refName||''}
            id={idName}
            value={value}
            name={name}
            title={title||''}
            onChange={this.handleChange}
            placeholder={placeholder||''}
            className={`input ${didError?'is-danger':''} ${isValidated?'is-success':''} ${className}`}/>;

    if (type=='textarea') {
      inputComponent=
        <textarea
          ref={refName}
          id={idName}
          className={type}
          onChange={this.handleChange}
          defaultValue={value}/>
    }

    return(
      <div className="field is-narrow">
        {label?
        <label className='label ' htmlFor={refName}>{label} </label>
        :''}
        <div className={`control ${(didError||isValidated)?'has-icons-right':''} ${icon?'has-icons-left':''}`}>
          {inputComponent}
          {icon?(
            <span className="icon is-small is-left">

            <i className={`fa fa-${icon}`}></i>
          </span>):''
          }
          {(didError||isValidated)?
          (<span className="icon is-small is-right">
            <i className={`fa fa-${didError?'warning':'check'}`}></i>
          </span>):''
          }
        </div>

            {(errorMsg)?<p className="help is-danger">{errorMsg}</p>:''}
    </div>
    )
  }
}

export default TextInput;
