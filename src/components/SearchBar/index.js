import React from 'react';

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
          <div className="field has-addons">
            <div className='control is-expanded'>
              <input className="input"
                 type="search"
                 placeholder="Enter a work description or artist name"
                 value={this.props.searchKey}
                 onChange={this.searchKeyChangeHandler.bind(this)}/>
            </div>
            <div className='control'>
               <button className="button is-primary" onClick={this.clearText.bind(this)}>
                Clear
              </button>
            </div>
          </div>
        );
    }
};

export default SearchBar;

//<button className="btn btn-link" ><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.clearText.bind(this)}></span></button>
