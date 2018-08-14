import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeText, testProxy } from 'redux/modules/info';
import './Home.scss';
@connect(state => ({ text: state.info.text }), { changeText, testProxy })

export default class Home extends Component {
    static propTypes = {
        text: PropTypes.any,
        changeText: PropTypes.func,
        testProxy: PropTypes.func
    };
    render() {
        return (
            <div>
            </div>
        );
    }
}
