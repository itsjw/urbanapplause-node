import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa/close';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMatchIndex: 0,
      maxLength: null,
      selectedOptionId: this.props.selectedOptionId||null,
      selectedOptionName: this.props.selectedOptionName||null,
      matchList: [],
    }
  }
  shouldShowMatches = () => {
    if (
      this.props.artistName.length>0 &&
      this.props.isCreatingNew==false &&
      this.activeElement==this.refs.input_box.focused
    ) {
      return true
    }else {
      return false;
    }
  }
  onInputChange = (e) => {
    this.props.onChange('artistName', e.target.value);
    this.updateMatchList(e.target.value);
  }
  updateMatchList = (query) => {
    var optionList = this.props.options;
    var matches = [];
    optionList.map((option, i) => {
      if (option.name.toLowerCase().indexOf(query.toLowerCase())>-1) {
        matches.push(optionList[i]);
      }
    });
    this.setState({
      matchList: matches,
      maxLength: matches.length
    });

  }
  onSetCreatingClick = () => {
    this.props.onChange('artistInputType', 'create');
    this.refs.input_box.focus();
  }

  onKeyDown = (e) => {
    const {activeMatchIndex, matchList} = this.state;
    const maxLength = this.state.maxLength;

    if (e.keyCode == 13) {
      e.preventDefault();
      if(activeMatchIndex == maxLength) {
        this.onSetCreatingClick();
      } else {
        Object.keys(matchList).map((key, i) => {
          if (i==activeMatchIndex) {
            this.onSelectArtist(key);
          }
        });
      }
    }
    if (e.keyCode == 40) { //down key pressed
      console.log('down key pressed ', activeMatchIndex);
      if(activeMatchIndex < maxLength) {
        this.setState({
          activeMatchIndex: this.state.activeMatchIndex + 1});
      }
    }
    if (e.keyCode == 38) {
      if(activeMatchIndex > 0) {
        this.setState({
          activeMatchIndex: activeMatchIndex- 1
        })
      }
    }
  }
  onSelectArtist = (key) => {
    const artist= this.state.matchList[key]
    this.props.onChange('artistId', artist.id);
    this.props.onChange('artistName', artist.name);
    this.hideMatches();
  }

  render() {
    const matches = this.state.matchList;
    const result = Object.keys(matches).map((key, index) =>
        <a
          key={key}
          value={key}
          className={(this.state.activeMatchIndex==index)?'dropdown-item is-active':'dropdown-item'}
          onClick={(e) => this.onSelectArtist(key)}>
            {matches[key].name}
      </a>

    )
    const showMatches = this.shouldShowMatches();
    return(
       <div className={showMatches==true?"dropdown is-active select-input":"dropdown select-input"} style={{width: '100%'}}>
          <div className='control' style={{width: '100%'}}>
            <div className="dropdown-trigger select-input">
              <input
                  className={`input`}
                  type='text'
                  ref='input_box'
                  value={this.props.artistName}
                  onChange={this.onInputChange}
                  onKeyDown={this.onKeyDown}
                  placeholder={this.props.placeholder}
                />
              </div>
            </div>
            <div className='dropdown-menu'>
              <div className='dropdown-content'>
                {result}
                <hr className="dropdown-divider"/>

                <a className={(this.state.activeMatchIndex==Object.keys(this.state.matchList).length)?'dropdown-item is-active':'dropdown-item'} onClick={this.onSetCreatingClick}
>
                   Create New
                </a>

              </div>
            </div>
        </div>
    )
  }
}

export default SelectInput;
