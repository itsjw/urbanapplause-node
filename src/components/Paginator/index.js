import React from 'react';

class Paginator extends React.Component {

    render() {
        let pages = Math.ceil(this.props.total/this.props.pageSize);
        return (
          <nav className="pagination is-centered" role="navigation" aria-label="pagination">
              <button className={"pagination-previous" + (this.props.page <= 1 ? " slds-hide" : "")} onClick={this.props.onPrevious}>
                Left/Back
              </button>

              <div className="pagination-list">{this.props.total} results • page {this.props.page}/{pages}</div>
            <button className={"pagination-next" + (this.props.page >= pages ? " slds-hide" : "")} onClick={this.props.onNext}>
              Right/Forward
            </button>

        </nav>
        );
    }
};

export default Paginator;
