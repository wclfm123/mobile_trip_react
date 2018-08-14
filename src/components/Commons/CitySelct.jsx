import React, { Component, PropTypes } from 'react';
import './CitySelct.scss';
const cityListData = {};
const internationalListData = {};
const hotCity = [];
let init = false;
export default class Overview extends Component {
    static propTypes = {
        onBack: PropTypes.func,
        onSelect: PropTypes.func
    };
    constructor(props) {
        super(props);
        init === false &&
            $.getJSON('/travel/city/getAll', (data) => {
                init = true;
                data.forEach((item) => {
                    if (item.domestic) {
                        cityListData[item.initial] = cityListData[item.initial] || [];
                        cityListData[item.initial].push(item);
                    } else {
                        internationalListData[item.initial] = internationalListData[item.initial] || [];
                        internationalListData[item.initial].push(item);
                    }
                    if (item.hot) {
                        hotCity.push(item);
                    }
                });
                this.setState({
                    searchData: data
                }, () => {
                    $('.gn_info .dw_title').each((idx, item) => {
                        const _this = $(item);
                        const typeName = _this.data('scroll');
                        this.state.gnOffset[typeName] = _this.offset().top;
                    });
                });
            });
        this.state = {
            gnOffset: {},
            gjOffset: {},
            searchData: []
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    searchList = (value) => {
        if (value.length > 0) {
            const searchResult = this.state.searchData.filter((item) => {
                return item.name.includes(value);
            });
            this.setState({
                search: true,
                searchResult
            });
        } else {
            this.setState({
                search: false
            });
        }
    }
    scrollTop = (type) => {
        if ($('.gn_info').hasClass('active')) {
            $('#content').scrollTop(this.state.gnOffset[type]);
        } else {
            $('#content').scrollTop(this.state.gjOffset[type]);
        }
    }
    render() {
        const { onBack, onSelect } = this.props;
        return (
            <div className="content" id="content" style={{ top: 0, zIndex: 105 }}>
                <div className="search_input">
                    <span className="back_choose" onClick={() => { onBack(); }}>返回</span>
                    <div className="input_right">
                        <input type="text" onChange={(e) => { this.searchList($.trim(e.target.value)); }} className="button button-light" placeholder="搜索城市\景点" />
                        <i className="iconfont">&#xe601;</i>
                    </div>
                </div>
                {
                    this.state.search ?
                        <div className="search_result">
                            <ul>
                                {
                                    this.state.searchResult.length > 0 ?
                                        this.state.searchResult.map((item, idx) => {
                                            return <li data-code={item.id} key={idx} onClick={() => { onBack(); onSelect(item); }}>{item.name}</li>;
                                        }) :
                                        <li style={{ border: 0, textAlign: 'center' }}>暂无数据</li>
                                }
                            </ul>
                        </div>
                        :
                        <div className="city-box">
                            <div className="buttons-tab">
                                <a href="#tab1" className="tab-link active button">国内</a>
                                <a href="#tab2" className="tab-link button" onClick={() => {
                                    if ($.isEmptyObject(this.state.gjOffset)) {
                                        $('.gj_info .dw_title').each((idx, item) => {
                                            const _this = $(item);
                                            const typeName = _this.data('scroll');
                                            this.state.gjOffset[typeName] = _this.offset().top;
                                        });
                                    }
                                }}>国际</a>
                            </div>
                            <div className="tabs">
                                <div id="tab1" className="tab active gn_info">
                                    <div className="dw">
                                        <p className="dw_title" data-scroll="top">定位城市</p>
                                        <p className="city_name" onClick={() => { onBack(); onSelect({ name: '成都', code: '5201' }); }}>成都</p>
                                    </div>
                                    <div className="dw">
                                        <p className="dw_title" data-scroll="hot">热门出发/集合地</p>
                                        <ul className="hot">
                                            {
                                                hotCity.map((item, idx) => {
                                                    return (
                                                        <li data-code={item.id} key={idx} onClick={() => { onBack(); onSelect(item); }}>{item.name}</li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="city_details">
                                        {
                                            Object.keys(cityListData).map((keys, idx) => {
                                                return (
                                                    <div className="dw" key={idx}>
                                                        <p className="dw_title" data-scroll={keys}>{keys}</p>
                                                        <ul className="city_list">
                                                            {
                                                                cityListData[keys].map((item, index) => {
                                                                    return (
                                                                        <li data-code={item.id} key={index} onClick={() => { onBack(); onSelect(item); }}>{item.name}</li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                <div id="tab2" className="tab gj_info">
                                    <div className="dw">
                                        <p className="dw_title" data-scroll="top">定位城市</p>
                                        <p className="city_name">成都</p>
                                    </div>
                                    <div className="dw">
                                        <p className="dw_title" data-scroll="hot">热门出发/集合地</p>
                                        <ul className="hot">
                                            {
                                                hotCity.map((item, idx) => {
                                                    return (
                                                        <li data-code={item.id} key={idx} onClick={() => { onBack(); onSelect(item); }}>{item.name}</li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="city_details">
                                        {
                                            Object.keys(internationalListData).map((keys, idx) => {
                                                return (
                                                    <div className="dw" key={idx}>
                                                        <p className="dw_title" data-scroll={keys}>{keys}</p>
                                                        <ul className="city_list">
                                                            {
                                                                internationalListData[keys].map((item, index) => {
                                                                    return (
                                                                        <li data-code={item.id} key={index} onClick={() => { onBack(); onSelect(item); }}>{item.name}</li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="scroll_btn">
                                <ul>
                                    <li onClick={() => { this.scrollTop('top'); }}>定位</li>
                                    <li onClick={() => { this.scrollTop('hot'); }}>热门</li>
                                    <li onClick={() => { this.scrollTop('A'); }}>A</li>
                                    <li onClick={() => { this.scrollTop('B'); }}>B</li>
                                    <li onClick={() => { this.scrollTop('C'); }}>C</li>
                                    <li onClick={() => { this.scrollTop('D'); }}>D</li>
                                    <li onClick={() => { this.scrollTop('E'); }}>E</li>
                                    <li onClick={() => { this.scrollTop('F'); }}>F</li>
                                    <li onClick={() => { this.scrollTop('G'); }}>G</li>
                                    <li onClick={() => { this.scrollTop('H'); }}>H</li>
                                    <li onClick={() => { this.scrollTop('I'); }}>I</li>
                                    <li onClick={() => { this.scrollTop('J'); }}>J</li>
                                    <li onClick={() => { this.scrollTop('K'); }}>K</li>
                                    <li onClick={() => { this.scrollTop('L'); }}>L</li>
                                    <li onClick={() => { this.scrollTop('M'); }}>M</li>
                                    <li onClick={() => { this.scrollTop('N'); }}>N</li>
                                    <li onClick={() => { this.scrollTop('O'); }}>O</li>
                                    <li onClick={() => { this.scrollTop('P'); }}>P</li>
                                    <li onClick={() => { this.scrollTop('Q'); }}>Q</li>
                                    <li onClick={() => { this.scrollTop('R'); }}>R</li>
                                    <li onClick={() => { this.scrollTop('S'); }}>S</li>
                                    <li onClick={() => { this.scrollTop('T'); }}>T</li>
                                    <li onClick={() => { this.scrollTop('U'); }}>U</li>
                                    <li onClick={() => { this.scrollTop('V'); }}>V</li>
                                    <li onClick={() => { this.scrollTop('W'); }}>W</li>
                                    <li onClick={() => { this.scrollTop('X'); }}>X</li>
                                    <li onClick={() => { this.scrollTop('Y'); }}>Y</li>
                                    <li onClick={() => { this.scrollTop('Z'); }}>Z</li>
                                </ul>
                            </div>
                        </div>
                }
            </div>
        );
    }
}
