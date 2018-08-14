import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { detailsActions } from 'redux/reduxAction';
import './Details.scss';
import moment from 'moment';

@connect(state => ({ details: state.details }), detailsActions)

export default class Details extends Component {
    static propTypes = {
        getDetailsInfo: PropTypes.func,
        details: PropTypes.any,
        params: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            showShare: false
        };
        this.props.getDetailsInfo(this.props.params.id);
    }
    render() {
        const { detailsData = {} } = this.props.details;
        return (
            <div>
                <div className="content">
                    <div className="back oh">
                        <div className="fl"><Link to="/publishList">返回结伴列表</Link></div>
                        <div className="fr">
                            <span>举报</span>
                            <span onClick={() => { this.setState({ showShare: true }); }}>分享</span>
                        </div>
                    </div>
                    {
                        !$.isEmptyObject(detailsData) &&
                        <div className="details_box">
                            <div className="details_title oh">
                                <div className="fl">
                                    <img src={`${detailsData.userInfo.headImgUrl}`} />
                                    {detailsData.userInfo.nickName}
                                    {
                                        detailsData.userInfo.sex === 1 ?
                                            <i className="iconfont f16 ml5">&#xe62b;</i>
                                            :
                                            <i className="iconfont f16 ml5 nv">&#xe618;</i>
                                    }
                                </div>
                                <div className="fr">{moment(detailsData.updateTime).format('YYYY-MM-DD HH:mm')}</div>
                            </div>
                            <div className="details_info">
                                <div className="details_item f14">
                                    <span>时间：</span> {`${moment(detailsData.departureTime).format('M')}月${moment(detailsData.departureTime).format('D')}日`}
                                </div>
                                <div className="details_item f14">
                                    <span>路线：</span> {detailsData.departure}出发去{detailsData.destinationList.map((destinationDta) => { return destinationDta; })}
                                </div>
                                <div className="details_item f14">
                                    <span>类型：</span>
                                    <dl>
                                        {
                                            detailsData.typeList.map((ele, i) => {
                                                return (
                                                    <dd key={i}>{ele.mateTypeName}</dd>
                                                );
                                            })
                                        }
                                    </dl>
                                </div>
                                <div className="details_item" style={{ lineHeight: '1.1rem' }}>
                                    {detailsData.content}
                                </div>
                                <div className="details_item">
                                    {
                                        detailsData.photoList &&
                                        detailsData.photoList.map((imgdata, j) => {
                                            return <img src={imgdata.imgUrl} key={j} />;
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div className="gz_tips">
                        关注公众号才能收到新消息提醒，<a>点击关注！</a>
                    </div>
                    <div className="contact">
                        <i className="iconfont">&#xe69a;</i>
                        联系ta
                    </div>
                    {
                        this.state.showShare ?
                            <div className="share_box" onClick={() => { this.setState({ showShare: false }); }}>
                                <p><img src="images/share_hint.png" alt="" /></p>
                                <p>点击右上角分享</p>
                            </div> : null
                    }
                </div>
            </div>
        );
    }
}
