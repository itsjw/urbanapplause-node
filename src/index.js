import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import WorkList from './components/WorkList';
import Paginator from './components/Paginator';
import SearchBar from './components/SearchBar';
import RangeSlider from './components/RangeSlider';

import * as workService from './services/work-service';

import './sass/main.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
            min: 0,
            max: 30,
            works: [],
            total: 0,
            page: 1
        }
    }
    componentDidMount() {
        this.findWorks();
    }
    searchKeyChangeHandler(searchKey) {
        this.setState({searchKey: searchKey, page: 1}, this.findWorks);
    }

    rangeChangeHandler(values) {
        this.setState({min: values[0], max: values[1], page: 1}, this.findWorks);
    }

    findWorks() {
        workService.findAll({search: this.state.searchKey, min: this.state.min, max: this.state.max, page: this.state.page})
        .then(data => {
          console.log(data);
                this.setState({
                    works: data.items,
                    page: data.page,
                    pageSize: data.pageSize,
                    total: data.total
                });
            });
    }

    nextPageHandler() {
        let p = this.state.page + 1;
        this.setState({page: p}, this.findWorks);
    }

    prevPageHandler() {
        let p = this.state.page - 1;
        this.setState({page: p}, this.findWorks);
    }

  render() {
        return (
            <div className="app-container">
              <Header text="Urban Applause"/>
                <section className="section">
                    <div className="">
                      <SearchBar searchKey={this.state.searchKey} onChange={this.searchKeyChangeHandler.bind(this)}/>
                    </div>
                  </section>

                <section className='section'>
                  <Paginator page={this.state.page} pageSize={this.state.pageSize} total={this.state.total} onPrevious={this.prevPageHandler.bind(this)} onNext={this.nextPageHandler.bind(this)}/>
                </section>
                <WorkList works={this.state.works} total={this.state.total} o/>
            </div>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("root"));

