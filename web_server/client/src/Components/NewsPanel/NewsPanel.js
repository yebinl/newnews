import './NewsPanel.css';
import React, { Component } from 'react';
import { Link } from 'react-router';
import NewsCard from '../NewsCard/NewsCard';
import _ from 'lodash';
import Auth from '../../Helper/Auth';

class NewsPanel extends Component {
    constructor() {
        super();
        this.state = {news : null, pageNum: 1, totalPage: 1, loadedAll: false};
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.loadMoreNews();
        this.loadMoreNews = _.debounce(this.loadMoreNews, 800);
        window.addEventListener('scroll', this.handleScroll);
    }

    loadMoreNews() {
        if(this.state.loadedAll === true) {
            return;
        }
        console.log(this.state.pageNum);
        let url = 'http://localhost:3000/news/userId/' + Auth.getEmail()
                  + '/pageNum/' + this.state.pageNum;
        let request = new Request(encodeURI(url), {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Auth.getToken(),
            },
            cache: false
        });
        fetch(request)
            .then((res) => res.json())
            .then((news) => {
                if (!news || news.length === 0) {
                    this.setState({loadedAll: true});
                }
            this.setState({
                news:this.state.news ? this.state.news.concat(news) : news,
                pageNum: this.state.pageNum + 1
            });
        });
    }

    handleScroll() {
        let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 500)) {
            this.loadMoreNews();
        }
    }

    renderNews() {
        const news_list = this.state.news.map(function(news) {
            return(
                <Link className='list-group-item' to="#">
                    <NewsCard news={news} />
                </Link>
            );
        });
        return(
            <div className='container-fluid'>
                <div className='list-group'>
                    {news_list}
                </div>
            </div>
        );
    }

    render() {
        if (this.state.news) {
            return (
                <div>
                    {this.renderNews()}
                </div>
            );
        } else {
            return (
                <div>
                    <div id="msg-app-loading">
                        Loading...
                    </div>
                </div>
            );
        }
    }
}

export default NewsPanel;