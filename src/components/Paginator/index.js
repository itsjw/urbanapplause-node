import React from 'react';
import {Icon} from 'react-fa';

class Paginator extends React.Component {

  render() {
    const previousButton = (
              <button className={"pagination-previous" + (this.props.page <= 1 ? " slds-hide" : "")} onClick={this.props.onPrevious}>
                <span className='icon is-medium'><Icon name='arrow-left'/></span>
              </button>);
    const nextButton = (
            <button className={"pagination-next" + (this.props.page >= pages ? " slds-hide" : "")} onClick={this.props.onNext}>
                <span className='icon is-medium'><Icon name='arrow-right'/></span>
            </button>);


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
