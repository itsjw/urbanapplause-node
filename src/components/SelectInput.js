import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa/close';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      activeMatchIndex: 0,
      selectedOptionId: this.props.selectedOptionId||null,
      selectedOptionName: this.props.selectedOptionName||null,
      showMatches: false,
      matchList: [],
    }
  }

  onInputChange = (e) => {
    this.setState({
      textInput: e.target.value,
      selectedOptionId: null,
      selectedOptionName: null,
      showMatches: true,
    });
    var optionList = this.props.options;
    var matches = [];
    optionList.map((option, i) => {
      if (option.name.toLowerCase().indexOf(e.target.value.toLowerCase())>-1) {
        matches.push(optionList[i]);
      }
    });
    this.setState({
      matchList: matches
    });
  }

  onKeyDown = (e) => {
    const {activeMatchIndex, matchList} = this.state;
    const maxLength = Object.keys(this.state.matchList).length;

    if (e.keyCode == 13) {
      e.preventDefault();
      if(activeMatchIndex == maxLength) {
      } else {
        Object.keys(matchList).map((key, i) => {
          if (i==activeMatchIndex) {
            this.selectMatch(key);
          }
        });
      }
    }
    if (e.keyCode == 40) { //down key pressed
      if(activeMatchIndex < maxLength) {
        this.setState({
          activeMatchIndex: this.state.activeMatchIndex+1});
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
  selectMatch = (key) => {
    this.setState({
      selectedOptionId: key,
      selectedOptionName: this.state.matchList[key].name,
      showMatches: false
    });
    this.props.onSelectMatch('artist_id', this.state.matchList[key].id);
  }
  onCreateNewClick = () => {
    this.setState({
      showMatches: false,
      isCreatingNew: true
    })
  }
  onClickMatch = (key) => {
    this.selectMatch(key);
  }
  cancelCreatingNew = () => {
    this.setState({
      isCreatingNew: false
    })
  }
  render() {
    const matches = this.state.matchList;
    const result = Object.keys(matches).map((key, index) =>
        <a
          key={key}
          value={key}
          className={(this.state.activeMatchIndex==index)?'dropdown-item is-active':'dropdown-item'}
          onClick={(e) => this.onClickMatch(key)}>
            {matches[key].name}
      </a>

      )
     return(
      <div className="field">
          <label className="label">{this.props.label||''}</label>
          <div className={(this.state.showMatches==true && this.state.textInput.length > 0)?"dropdown is-active select-input":"select-input"}>
            <div className='control'>
              <div className="dropdown-trigger select-input">
                <input
                  className={`input ${this.state.selectedOptionId?'is-success':''} ${(this.props.errorText.length>0)?'is-danger':''}`}
                  type='text'
                  value={this.state.selectedOptionName||this.state.textInput}
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
                <a className={(this.state.activeMatchIndex==Object.keys(this.state.matchList).length)?'dropdown-item is-active':'dropdown-item'} onClick={this.onCreateNewClick}
>
                   Unknown
                </a>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default SelectInput;
