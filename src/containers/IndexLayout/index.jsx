import React, { Component, PropTypes } from 'react';
import './app.scss';
import { Footer } from 'containers';
export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    };
    componentDidMount() {
    }
    render() {
        return (
            <div className="page-group">
                <div className="page page-current">
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        );
    }
}
