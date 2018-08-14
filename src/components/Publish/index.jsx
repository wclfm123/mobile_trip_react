import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import moment from 'moment';
import './Publish.scss';
import CitySelect from '../Commons/CitySelct.jsx';
import { PublishActions } from 'redux/reduxAction';
import { Button, DatePicker, List } from 'antd-mobile';

@withRouter
@connect(state => ({ publishState: state.publish }), PublishActions)

export default class Publish extends Component {

    static propTypes = {
        PublishState: PropTypes.any,
        router: PropTypes.any,
        uploadFile: PropTypes.func,
        addMate: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            checkArea: false,
            setOutPlace: {}, // 出发地
            destinationPlace: [], // 目的地
            goType: [], // 已选择结伴类型
            goTypes: [
                {
                    mateTypeName: '结伴拼车',
                    mateType: '01',
                    isChecked: false
                }, {
                    mateTypeName: '结伴拼房',
                    mateType: '02',
                    isChecked: false
                }, {
                    mateTypeName: '自驾捡人',
                    mateType: '03',
                    isChecked: false
                }, {
                    mateTypeName: '结伴同行',
                    mateType: '04',
                    isChecked: false
                }, {
                    mateTypeName: '求车捡走',
                    mateType: '05',
                    isChecked: false
                }
            ],
            isSure: true, // 时间是否确定
            imageList: [], // 上传图片地址,
            content: '', // 结伴详情
            time: new Date(),
        };
    }
    componentDidMount() {
        $('#start-picker').calendar({
            onOpen: () => {
                $('.toolbar-inner a').attr('href', 'javascript:void(0)');
            },
            value: [moment().format('YYYY-MM-DD')],
        });
    }
    /* 选择结伴类型 */
    checkGotype = (type) => {
        if (this.state.goType.length > 2) {
            $.alert('最多只能选择两类！');
            return;
        }
        this.state.goTypes.forEach((item) => {
            if (item.mateTypeName === type) {
                item.isChecked = !item.isChecked;
            }
        });
        this.state.goType = this.state.goTypes.filter((item) => { return item.isChecked; });
        this.setState({});
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
    /* 上传图片 */
    changeFile = (e) => {
        const uploadData = e.target.files[0];
        if (uploadData.size / 1024 / 1024 > 4) {
            $.alert('最大只能为4M哦');
            return;
        }
        const formdata = new FormData();
        const imageUrl = this.state.imageList.map((item) => item);
        formdata.append('file', uploadData);
        this.props.uploadFile(formdata, (imgData) => {
            imageUrl.push(imgData);
            // for (let i = 0; i < e.target.files.length; i++) {
            //     imageUrl.push(e.target.files[i]);
            // }
            if (imageUrl.length > 9) {
                $.alert('上传图片最多为9张！');
                return;
            }
            this.setState({
                imageList: imageUrl
            });
        });
    }
    /* 删除图片 */
    deleteImg = (idx) => {
        const imageUrl = this.state.imageList;
        imageUrl.splice(idx, 1);
        // imageUrl.forEach((item, idex) => {
        //     if (item.name === imgName) {
        //         imageUrl.splice(idex, 1);
        //     }
        // });
        this.setState({
            imageList: imageUrl
        });
    }
    changeTimeRange = (e) => {
        if (e.target.value === 'timeComfir') {
            this.setState({
                isSure: true
            });
        } else {
            this.setState({
                isSure: false
            });
        }
    }
    addMate = () => {
        if (!this.state.setOutPlace.name) {
            $.alert('请选择出发地');
            return;
        }
        if (this.state.destinationPlace.length === 0) {
            $.alert('请选择目的地');
            return;
        }
        if (!$('#start-picker').val()) {
            $.alert('请填写时间');
            return;
        }
        if (this.state.goType.length === 0) {
            $.alert('请选择结伴类型');
            return;
        }
        if (this.state.content.length > 500) {
            $.alert('详细信息不能超过500');
            return;
        }
        this.state.goType.forEach((item) => {
            delete item.isChecked;
        });
        this.props.addMate({
            departure: this.state.setOutPlace.name,
            destinationList: this.state.destinationPlace.map((item) => item.name),
            content: this.state.content,
            sure: this.state.isSure,
            photoUrlList: this.state.imageList,
            departureTime: $('#start-picker').val(),
            typeList: this.state.goType,
            userId: '97293665969373253'
        }, () => {
            $.toast('添加成功,2秒后跳转到列表页', 2000);
            setTimeout(() => {
                this.props.router.push('publishList');
            }, 2000);
        });
    }
    render() {
        return (
            <div>
                <header className="bar bar-nav">
                    <Link to={'/PublishList'} className="button button-link button-nav pull-left">
                        <span className="icon icon-left"></span>
                        返回
                    </Link>
                    <h1 className="title">发布结伴</h1>
                </header>
                <div className="content">
                    <div className="popup_item">
                        <ul>
                            <li onClick={() => { this.checkAreaFun('SetOut'); }}>
                                <span>集合地</span>{this.state.setOutPlace.name || ''}
                                <i className="iconfont">&#xe605;</i>
                            </li>
                            <li>
                                <span>目的地</span>
                                <dl className="place common_dl" style={{ marginRight: '1.8rem' }}>
                                    {
                                        this.state.destinationPlace.length > 0 ? this.state.destinationPlace.map((item, idx) => {
                                            return <dd key={idx}>{item.name}<i className="iconfont" onClick={() => { this.deletDestionation(item.name); }}>&#xe68e;</i></dd>;
                                        }) : <dd style={{ border: 0 }}>建议按路线添加目的地</dd>
                                    }
                                </dl>
                                <i className="iconfont" onClick={() => { this.checkAreaFun('Destination'); }}>&#xe600;</i>
                            </li>
                            <li>
                                <span>集合时间</span>
                                <DatePicker
                                    value={this.state.time}
                                    onChange={date => this.setState({ time: date })}
                                />
                            </li>
                            <li>
                                <span>时间范围</span>
                                <input type="radio" name="check" value="timeComfir" checked={this.state.isSure ? true : false} onClick={this.changeTimeRange} /> 时间确定
                                <input type="radio" name="check" value="timeNoComfir" checked={this.state.isSure ? false : true} onClick={this.changeTimeRange} className="ml10" /> 时间可前后调整
                            </li>
                            <li>
                                <span>结伴类型</span>
                                <dl className="lexing common_dl">
                                    {
                                        this.state.goTypes.map((item, idx) => {
                                            return (
                                                <dd
                                                    className={item.isChecked ? 'select' : null}
                                                    onClick={() => { this.checkGotype(item.mateTypeName); }}
                                                    key={idx}
                                                >{item.mateTypeName}</dd>
                                            );
                                        })
                                    }
                                </dl>
                            </li>
                            <li className="clearance"></li>
                            <li>
                                <Button>default</Button>
                                <textarea maxLength="600" onChange={(e) => { this.setState({ content: e.target.value }); }} placeholder="在这里可以说明你们人数、费用预算、需求等等，建议不要留下微信号，以免被骚扰、可以先私信了解后在加微信" />
                            </li>
                            <li className="clearance"></li>
                            <li className="special">
                                <div className="upload_btn">
                                    <input type="file" accept="image/jpeg,image/jpg,image/png" name="file" id="file" onChange={(e) => this.changeFile(e)} value="" multiple />
                                </div>
                                {
                                    this.state.imageList.length > 0 ?
                                        this.state.imageList.map((item, idx) => {
                                            return (
                                                <div className="upload_sm" key={idx}>
                                                    {/* <img src={window.URL.createObjectURL(item)} /> */}
                                                    <img src={item} />
                                                    <i className="icon_delete" onClick={() => { this.deleteImg(idx); }}></i>
                                                </div>
                                            );
                                        }) : <div className="upload_sm" style={{ width: 'auto' }}>上传照片让小伙伴更了解你</div>
                                }
                            </li>
                        </ul>
                    </div>
                    <input type="button" value="发布" onClick={this.addMate} className="publish_btn" />
                </div>
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
