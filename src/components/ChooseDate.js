import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class ChooseDate extends Component {
  handleDayChange = (day) => {
    console.log(day);
    //this.props.onChange('date', day);
  }
  handleSetNow = () => {
    this.props.onInputClear('date', null); //leave null if want to use current datetime
  }
  render() {
    return(
      <div style={{zIndex: '20'}}>
        <label className='label'>Date photo was taken</label>
        <DayPickerInput
          value={this.props.date}
          onDayChange={this.handleDayChange}
          classNames={styles}
        />
      </div>
    )
  }
}

export default ChooseDate;

const styles ={
  core: {
    color: 'red',
    zIndex: '20'
  }
}
