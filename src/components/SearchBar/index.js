import React from 'react';
import {Icon} from 'react-fa';

class SearchBar extends React.Component {

    searchKeyChangeHandler(event) {
        let searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.onChange(searchKey);
    }

    clearText() {
        this.setState({searchKey: ""});
        this.props.onChange("");
    }

    render() {
        return (
          <div className="field ">
            <div className='control is-expanded has-icons-left has-icons-right' style={{height: '48px'}}>
              <input className="input"
                style={{height: '48px', zIndex: 2}}
                 type="search"
                 placeholder={this.props.placeholder ||"Enter a work description or artist name"}
                 value={this.props.searchKey}
                 onChange={this.searchKeyChangeHandler.bind(this)}/>
              <span className="icon is-small is-left" style={{height: '48px'}}>
                <Icon name="search"/>
              </span>

              <span class="icon is-small is-right" onClick={this.clearText} style={{height: '48px', cursor: 'pointer', zIndex: 3}}>
                <Icon name='close' style={{cursor: 'pointer'}}/>
            </span>
            </div>
          </div>
        );
    }
};

export default SearchBar;

//<button className="btn btn-link" ><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.clearText.bind(this)}></span></button>
