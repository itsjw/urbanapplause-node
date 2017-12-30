import React, { Component } from 'react';
import SelectInput from './SelectInput';
import InputStatusTag from './InputStatusTag';
class ChooseArtist extends Component {
  constructor(props){
    super(props);
  }
  setUnknown = () => {
    this.props.onChange('artistInputType', 'unknown');
  }
  clearInput = () => {
    this.props.onChange('artistInputType', 'select');

    this.props.onChange('artistName', '');
    this.props.onChange('artistId', null);
  }
  handleSelectArtist = (e) => {
    this.props.onChange('artistName', '');
    this.props.onChange('artistId', e.target.value);
  }
  render() {
    const artistName = this.props.artistName;
    var successText = '';
    switch (this.props.artistInputType) {
      case 'create':
        successText = 'Creating New';
        break;
      case 'unknown':
        successText = 'Artist Unknown';
        break;
      case 'select':
        successText = artistName;
        break;
    }
    return(
      <div className='field'>
        <label className='label'>Artist</label>
        <InputStatusTag
          successText={successText}
          onClear={this.clearInput}
          status={this.props.artistId||this.props.artistInputType!='select'?'complete':null} /><br/>

          {this.props.artistInputType!='unknown'&&this.props.artistId==null?(
          <SelectInput
            isCreatingNew={this.props.artistInputType=='create'?true:false}
            artistName={this.props.artistName}
            options={this.props.artistOptions}
            onChange={this.props.onChange}
          />):''}
          {this.props.artistId||this.props.artistInputType!='select'?'':(
            <a onClick={this.setUnknown}>
              I don't know the artist
        </a>)}
      </div>
    )
  }
}

export default ChooseArtist;
