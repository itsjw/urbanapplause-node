import React from 'react';
import {Icon} from 'react-fa';

class Paginator extends React.Component {

  render() {
    const previousButton = (
              <button className={"pagination-previous icon is-medium" + (this.props.page <= 1 ? " slds-hide" : "")} onClick={this.props.onPrevious}>
                <i className='fa fa-arrow-left'></i>
              </button>);
    const nextButton = (
            <button className={"pagination-next icon is-medium" + (this.props.page >= pages ? " slds-hide" : "")} onClick={this.props.onNext}>
              <i className='fa fa-arrow-right'></i>            </button>);


    let pages = Math.ceil(this.props.total/this.props.pageSize);


        return (
          <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            {(this.props.page>1)?previousButton:''}

              <div className="pagination-list">{this.props.total} results • page {this.props.page}/{pages}</div>

            {(this.props.page<pages)?nextButton:''}
        </nav>
        );
    }
};

export default Paginator;
