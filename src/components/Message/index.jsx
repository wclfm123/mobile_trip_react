import React, { Component } from 'react';
import './Message.scss';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="content">
                    <div className="message_list">
                        <ul>
                            <li>
                                <div className="fl">
                                    <img src="images/tx.png" alt="" />
                                    <i className="tip_num">1</i>
                                </div>
                                <div className="message_list">
                                    <p className="mesage_tit oh">
                                        <span className="fl f16">兔小白</span>
                                        <span className="fr">12:11</span>
                                    </p>
                                    <p className="mess_info">我们本来我们本来我们本来我们本来我们本来我们本来</p>
                                </div>
                            </li>
                            <li>
                                <div className="fl">
                                    <img src="images/tx.png" alt="" />
                                    <i className="tip_num">9+</i>
                                </div>
                                <div className="message_list">
                                    <p className="mesage_tit oh">
                                        <span className="fl f16">兔小白</span>
                                        <span className="fr">12:11</span>
                                    </p>
                                    <p className="mess_info">我们本来我们本来我们本来我们本来我们本来我们本来</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
