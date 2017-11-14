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
      input_type: 'none selected'
    }
  }
  showOptions = () => {
    if (this.state.textInput.length>0) {
      this.setState({
        showMatches: true
      })
    }
  }
  hideOptions = () => {
    this.setState({
      showMatches: false
    });
  }

  onInputChange = (e) => {
    this.setState({
      textInput: e.target.value
    });
    if (this.state.input_type==this.props.createOption) {
      this.props.setValue(this.props.createOption, e.target.value);
    } else {
        this.setState({
          input_type: 'none selected'
        })
    }
    this.refreshOptionList(e.target.value);
  }
  refreshOptionList = (stringInput) => {
    var optionList = this.props.options;
    var matches = [];
    optionList.map((option, i) => {
      if (option.name.toLowerCase().indexOf(stringInput.toLowerCase())>-1) {
        matches.push(optionList[i]);
      }
    });
    this.setState({
      matchList: matches
    });

  }
  onSetCreatingClick = () => {
    this.setState({
      input_type: this.props.createOption,
      selectedOptionId: null,
      selectedOptionName: null
    });
    this.hideOptions();
    this.props.setValue(this.props.createOption, this.state.textInput);
    this.refs.input_box.focus();
  }
  onSetUnknownClick = () => {
    this.setState({
      input_type: this.props.unknownOption,
      textInput: 'Anonymous',
      selectedOptionId: null,
      selectedOptionName: null
    });
    this.hideOptions();
    this.props.setValue(this.props.unknownOption, '');
  }

  onKeyDown = (e) => {
    const {activeMatchIndex, matchList} = this.state;
    const maxLength = Object.keys(this.state.matchList).length+1;

    if (e.keyCode == 13) {
      e.preventDefault();
      if(activeMatchIndex == maxLength) {
        this.onSetCreatingClick();
      } else if (activeMatchIndex == maxLength-1) {
        this.onSetUnknownClick();
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
    console.log('match selected');
    this.setState({
      input_type: this.props.selectOption,
      selectedOptionId: key,
      textInput: this.state.matchList[key].name,
    });
    this.props.setValue(this.props.selectOption, this.state.matchList[key].id);
  }

  onMatchClick = (key) => {
    this.selectMatch(key);
  }
  clearInputType = () => {
    this.setState({
      input_type: 'none selected',
      selectedOptionId: null,
      selectedOptionName: null,
      textInput: ''
    });
    this.props.setValue(null, null);
    this.refs.input_box.focus();
    this.refs.input_box.select();
  }

  render() {
    const matches = this.state.matchList;
    const result = Object.keys(matches).map((key, index) =>
        <a
          key={key}
          value={key}
          className={(this.state.activeMatchIndex==index)?'dropdown-item is-active':'dropdown-item'}
          onClick={(e) => this.onMatchClick(key)}>
            {matches[key].name}
      </a>

      )
     return(
      <div className="field">
          <label className="label">{this.props.label||''}</label>
          <div className={(this.state.input_type=='none selected'&& this.state.textInput.length > 0)?"dropdown is-active select-input":"select-input"}>
            <div className='control'>
              <div className="dropdown-trigger select-input">
                {this.state.input_type} <span onClick={this.clearInputType}> X </span><input
                  className={`input ${this.state.selectedOptionId?'is-success':''} ${(this.props.errorText.length>0)?'is-danger':''}`}
                  type='text'
                  ref='input_box'
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
                <a className={(this.state.activeMatchIndex==Object.keys(this.state.matchList).length)?'dropdown-item is-active':'dropdown-item'} onClick={this.onSetUnknownClick}
>
                   Unknown
                 </a>
                  <hr className="dropdown-divider"/>
                <a className={(this.state.activeMatchIndex==Object.keys(this.state.matchList).length+1)?'dropdown-item is-active':'dropdown-item'} onClick={this.onSetCreatingClick}
>
                   Create New
                </a>

              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default SelectInput;
