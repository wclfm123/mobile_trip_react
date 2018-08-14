import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';

@withRouter
export default class App extends Component {
    static propTypes = {
        router: PropTypes.object,
    };
    componentDidMount() {
    }
    render() {
        const locationHash = window.location.hash;
        if (locationHash.includes('#/?')) this.props.router.push('/addMate');
        return (
            <nav className="bar bar-tab">
                <Link className={locationHash.includes('publishList') ? 'tab-item external active' : 'tab-item external'} to="/publishList">
                    <span className="icon iconfont">&#xe601;</span>
                    <span className="tab-label">找结伴</span>
                </Link>
                <Link className={locationHash.includes('addMate') ? 'tab-item external active' : 'tab-item external'} to="/addMate">
                    <span className="icon iconfont">&#xe630;</span>
                    <span className="tab-label">发布结伴</span>
                </Link>
                <Link className={locationHash.includes('message') ? 'tab-item external active' : 'tab-item external'} to="/message">
                    <span className="icon iconfont">&#xe69a;</span>
                    <span className="tab-label">消息</span>
                </Link>
                <Link className="tab-item external" to="#">
                    <span className="icon iconfont">&#xe62c;</span>
                    <span className="tab-label">我的</span>
                </Link>
            </nav>
        );
    }
}
