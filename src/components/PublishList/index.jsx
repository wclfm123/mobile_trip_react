import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { PublishListActions } from 'redux/reduxAction';
import './PublishList.scss';
import NullList from './NullList.jsx';
import CitySelect from '../Commons/CitySelct.jsx';

@connect(state => ({ PublishListState: state.PublishList }), PublishListActions)
export default class Home extends Component {
    static propTypes = {
        PublishListState: PropTypes.any,
        getAllList: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
            noData: false,
            checkArea: false,
            setOutPlace: {}, // 出发地
            destinationPlace: [], // 目的地
            goType: [], // 已选择结伴类型
            goTypes: [
                {
                    type: '结伴拼车',
                    code: '01',
                    isChecked: true
                }, {
                    type: '结伴拼房',
                    code: '02',
                    isChecked: true
                }, {
                    type: '自驾捡人',
                    code: '03',
                    isChecked: true
                }, {
                    type: '结伴同行',
                    code: '04',
                    isChecked: true
                }, {
                    type: '求车捡走',
                    code: '05',
                    isChecked: true
                }
            ]
        };
    }
    componentWillMount() {
        this.props.getAllList();
    }
    componentDidMount() {
        $('#start-picker,#end-picker').calendar({
            onOpen: () => {
                $('.toolbar-inner a').attr('href', 'javascript:void(0)');
            },
            value: [moment().format('YYYY-MM-DD')],
        });
    }
    /* 打开搜索框 */
    openPopup = () => {
        this.setState({
            openPopup: true
        });
    }
    /* 关闭搜索选择框 */
    closePopup = () => {
        this.setState({
            openPopup: false
        });
    }
    /* 选择区域 */
    checkAreaFun = (checkType) => {
        this.setState({
            checkArea: true,
            checkType
        });
    }
    /* 删除目的地 */
    deletDestionation = (name) => {
        this.state.destinationPlace.forEach((item, idx) => {
            if (item.name === name) {
                this.state.destinationPlace.splice(idx, 1);
            }
        });
        this.setState({});
    }
    /* 选择结伴类型 */
    checkGotype = (type) => {
        this.state.goTypes.forEach((item) => {
            if (item.type === type) {
                item.isChecked = !item.isChecked;
            }
        });
        this.setState({});
    }
    /** 确定选择 */
    comfirmCheck = () => {
        if (!this.state.setOutPlace.name && this.state.destinationPlace.length === 0) {
            $.toast('出发地或者目的地不能为空！');
            return;
        }
        this.setState({
            openPopup: false,
            startDate: $('#start-picker').val(),
            endDate: $('#end-picker').val(),
            goType: this.state.goTypes.filter((item) => { return item.isChecked; })
        }, () => {
            this.props.getAllList({
                destinationList: this.state.destinationPlace.toString(),
                typeCodeList: this.state.goType.map((item) => item.code).toString(),
                departure: this.state.setOutPlace.name,
                startTime: this.state.startDate,
                endTime: this.state.endDate
            });
        });
    }
    render() {
        const { listData } = this.props.PublishListState;
        return (
            <div>
                {
                    this.state.noData ?
                        <NullList />
                        :
                        <div className="content">
                            {/* 搜索条件开始 */}
                            <section className="search_box">
                                <div className="item">
                                    <span>出发：</span>
                                    {this.state.setOutPlace.name}
                                </div>
                                <div className="item">
                                    <span>时间：</span>
                                    {this.state.startDate} - {this.state.endDate}
                                </div>
                                <div className="item">
                                    <span>要去：</span>
                                    <dl className="common_dl">
                                        {
                                            this.state.destinationPlace.map((item, idx) => {
                                                return <dd key={idx}>{item.name}</dd>;
                                            })
                                        }
                                    </dl>
                                </div>
                                <div className="item">
                                    <span>类型：</span>
                                    <dl className="common_dl">
                                        {
                                            !(this.state.goType.length === 5) ? this.state.goType.map((item, idx) => {
                                                return <dd key={idx}>{item.type}</dd>;
                                            }) : <dd>不限</dd>
                                        }
                                    </dl>
                                </div>
                                <div className="screen_btn" onClick={this.openPopup}><i className="iconfont mr5">&#xe624;</i>筛选</div>
                            </section>
                            {/* 搜索条件结束 */}
                            {/* 列表开始 */}
                            <section className="go_list">
                                {
                                    listData.length > 0 ?
                                        listData.map((item, idx) => {
                                            return (
                                                <Link to={`details/${item.id}`} key={idx}>
                                                    <div className="card mate_list">
                                                        {
                                                            (item.status === '02' || item.status === '03')
                                                            &&
                                                            <div className="status"><img src="images/completed.png" alt="" /></div>
                                                        }
                                                        <div className="card-header color-white no-border">
                                                            <div className="fl">
                                                                {
                                                                    item.userInfo &&
                                                                    <div>
                                                                        <img src={`${item.userInfo.headImgUrl}`} />
                                                                        {item.userInfo.nickName}
                                                                        {
                                                                            item.userInfo.sex === 1 ?
                                                                                <i className="iconfont f16 ml5">&#xe62b;</i>
                                                                                :
                                                                                <i className="iconfont f16 ml5 nv">&#xe618;</i>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="fr">
                                                                <dl className="common_dl">
                                                                    {
                                                                        item.typeList.map((ele, i) => {
                                                                            return (
                                                                                <dd key={i}>{ele.mateTypeName}</dd>
                                                                            );
                                                                        })
                                                                    }
                                                                </dl>
                                                            </div>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="card-content-inner">
                                                                <div className="card_title">
                                                                    <time>{`${moment(item.departureTime).format('M')}月${moment(item.departureTime).format('D')}日`}{item.sure ? '' : '左右'}</time>
                                                                    {item.departure}出发去{item.destinationList.map((destinationDta) => { return destinationDta; })}
                                                                </div>
                                                                <div className="info">{item.content}</div>
                                                                <div className="img_list">
                                                                    <ul>
                                                                        {
                                                                            item.photoList.length > 0 &&
                                                                            item.photoList.map((imgdata, j) => {
                                                                                return <li key={j}><img src={imgdata.imgUrl} /></li>;
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                        : <div className="nodata">暂无数据</div>
                                }
                            </section>
                            {/* 列表结束 */}
                        </div>
                }
                {/* 筛选内容 */}
                <div className={this.state.openPopup ? 'search_choose popup_info popup_show' : 'search_choose popup_info'}>
                    <div className="popup_item">
                        <ul>
                            <li onClick={() => { this.checkAreaFun('SetOut'); }}>
                                <span>出发地</span>{this.state.setOutPlace.name}
                                <i className="iconfont">&#xe605;</i>
                            </li>
                            <li>
                                <span>目的地</span>
                                <dl className="place common_dl" style={{ marginRight: '1.8rem' }}>
                                    {
                                        this.state.destinationPlace.map((item, idx) => {
                                            return <dd key={idx}>{item.name}<i className="iconfont" onClick={() => { this.deletDestionation(item.name); }}>&#xe68e;</i></dd>;
                                        })
                                    }
                                </dl>
                                <i className="iconfont" onClick={() => { this.checkAreaFun('Destination'); }}>&#xe600;</i>
                            </li>
                            <li>
                                <span>出发时间</span>
                                <input type="text" placeholder="请选择" className="button button-dark" id="start-picker" />
                                <em className="ml5 mr5">-</em>
                                <input type="text" placeholder="请选择" className="button button-dark" id="end-picker" />
                            </li>
                            <li>
                                <span>结伴类型</span>
                                <dl className="lexing common_dl">
                                    {
                                        this.state.goTypes.map((item, idx) => {
                                            return (
                                                <dd
                                                    className={item.isChecked ? 'select' : null}
                                                    onClick={() => { this.checkGotype(item.type); }}
                                                    key={idx}
                                                >{item.type}</dd>
                                            );
                                        })
                                    }
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div className="popup_button">
                        <input type="button" onClick={this.closePopup} className="button button-dark fl" value="取消" />
                        <input type="button" onClick={this.comfirmCheck} className="button fr" value="确定" />
                    </div>
                </div>
                <div className={this.state.openPopup ? 'popup_mask' : ''} onClick={this.closePopup}></div>
                {
                    this.state.checkArea ?
                        <CitySelect
                            onBack={() => { this.setState({ checkArea: false }); }}
                            onSelect={(select) => {
                                if (this.state.checkType === 'Destination') {
                                    this.state.destinationPlace.push(select);
                                    this.setState({});
                                } else {
                                    this.setState({
                                        setOutPlace: select
                                    });
                                }
                            }}
                        />
                        : null
                }
            </div>
        );
    }
}
