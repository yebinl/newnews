import './NewsPanel.css';
import React, { Component } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import _ from 'lodash';
import Auth from '../../Helper/Auth';

class NewsPanel extends Component {
    constructor() {
        super();
        this.state = {news : null};
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.loadMoreNews();
        this.loadMoreNews = _.debounce(this.loadMoreNews, 800);
        window.addEventListener('scroll', this.handleScroll);
    }

    loadMoreNews() {
        let request = new Request('http://localhost:3000/news', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Auth.getToken(),
            },
            cache: false
        });
        fetch(request)
        .then(res => res.json(res))
        .then(news => {
            this.setState({
                news: this.state.news ? this.state.news.concat(news) : news
            });
        })
    }
    handleScroll() {
        let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 500)) {
            console.log('Loading more news');
            this.loadMoreNews();
        }
    }

    renderNews() {
        let news_list = this.state.news.map(function(news) {
            return(
                <a className='list-group-item' key={news.digest} href="#">
                    <NewsCard news={news} />
                </a>
            );
        });
        return (
            <div className="container-fluid">
                <div className="list-group">
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