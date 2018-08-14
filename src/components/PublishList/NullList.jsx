import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';

export default class NullList extends Component {
    render() {
        return (
            <div className="content">
                <div className="null_box">
                    <div className="text_box">
                        <p>需要发布结伴后,才能搜索相匹配的结伴信息</p>
                        <p>提高大家的搜索效率</p>
                    </div>
                    <div className="text-bt">
                        <input type="button" className="button" value="快速发布结伴" />
                    </div>
                    <div className="text_ad">最近7天已有<span>6808</span>人发布结伴</div>
                    <div className="text_list">
                        <ul>
                            <li>
                                <img src="images/test.jpg" />
                                <div className="name">
                                    泰国
                                <p><em>8303</em>人结伴中</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/test.jpg" />
                                <div className="name">
                                    泰国
                                <p><em>8303</em>人结伴中</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/test.jpg" />
                                <div className="name">
                                    泰国
                                <p><em>8303</em>人结伴中</p>
                                </div>
                            </li>

                            <li>
                                <img src="images/test.jpg" />
                                <div className="name">
                                    泰国
                                <p><em>8303</em>人结伴中</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/test.jpg" />
                                <div className="name">
                                    泰国
                                <p><em>8303</em>人结伴中</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/test.jpg" />
                                <div className="name">
                                    泰国
                                <p><em>8303</em>人结伴中</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="text_tips">
                        <i className="iconfont">&#xe651;</i>商业拉客或目的不纯者直接封号
                    </div>
                </div>
            </div>
        );
    }
}
