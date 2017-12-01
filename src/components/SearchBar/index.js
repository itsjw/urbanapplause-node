import React from 'react';
import {Icon} from 'react-fa';

class SearchBar extends React.Component {

    searchKeyChangeHandler(event) {
        let searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.onChange(searchKey);
    }

  clearText = () => {
        this.setState({searchKey: ""});
        this.props.onChange("");
    }

    render() {
        return (
          <div className="field ">
            <div className='control is-expanded has-icons-left has-icons-right' >
              <input className="input"
                 type="search"
                 placeholder={this.props.placeholder ||"Enter a work description or artist name"}
                 value={this.props.searchKey}
                 onChange={this.searchKeyChangeHandler.bind(this)}/>
              <span className="icon is-small is-left" >
                <Icon name="search"/>
              </span>
              <span style={{cursor: 'pointer', position:'absolute', top: '0', right: '0', height: '100%', paddingRight: '10px', zIndex: '5',paddingTop: '8px'}} onClick={this.clearText} >
                <a className='delete' style={{cursor: 'pointer'}} onClick={this.clearText}  />
              </span>
            </div>
          </div>
        );
    }
};

export default SearchBar;

//<button className="btn btn-link" ><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.clearText.bind(this)}></span></button>
