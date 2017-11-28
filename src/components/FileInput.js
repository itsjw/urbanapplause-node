import React, { Component } from 'react';

class FileInput extends Component {
  render() {
    const {label, name, imgUrl, refName, onChange, errorMsg, fileUploadStatus} = this.props;

    console.log(fileUploadStatus);
    return(
      <div className='field'>
        {(fileUploadStatus=='complete')?<div className='file-upload-preview'><img src={imgUrl} /></div>:''}
        {(fileUploadStatus=='pending')?<div className='file-upload-preview'><a className="button is-loading">Loading</a></div>:''}
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name={name||"photo"} onChange={onChange||''}/>
            <span className="file-cta">
              <span className="file-icon">
                <i className="fa fa-upload"></i>
              </span>
              <span className="file-label">
                Choose an image…
              </span>
            </span>
          </label>
        </div>
      </div>

    )
  }
}

export default FileInput;
