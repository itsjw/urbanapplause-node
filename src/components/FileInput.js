import React, { Component } from 'react';

class FileInput extends Component {
  render() {
    console.log(this.props.imgUrl);
    const {label, name, imgUrl, refName, onChange, errorMsg, fileUpload} = this.props;
    return(
      <div className='field'>
        {fileUpload?<img alt='Loading...' src={imgUrl}/>:''}
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name={name||"photo"} onChange={onChange||''}/>
            <span className="file-cta">
              <span className="file-icon">
              </span>
              <span className="file-label">
                {imgUrl?'Change photo':label||'Choose a file…'}
              </span>
            </span>
            <span className="file-name">
          </span>
          </label>
        </div>
      </div>

    )
  }
}

export default FileInput;
