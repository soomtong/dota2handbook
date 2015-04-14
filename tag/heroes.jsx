var HeroOrderSelector = React.createClass({
    getInitialState: function () {
        return {
            selectedOrder: this.props.selectedOrder || 'common'
        };
    },
    handleChange: function (event) {
        this.state.selectedOrder = event.target.value;
        this.props.onOrderSubmit({ order: event.target.value });
    },
    componentDidMount: function() {
        $('#hero_panel').find('div.order ul').on('click', 'li > label', this.handleChange);
    },
    render: function () {
        var selector = this.state.selectedOrder;

        return (
            <div className="order">
                <ul className="forms-inline-list">
                    <li className="label label-outline">정렬</li>
                    {heroData.order.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="radio" name="hero_list_order" defaultChecked={item.id == selector } value={ item.id }/>
                                { item.title }</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var HeroFilter = React.createClass({
    getInitialState: function () {
        return {
            selectedFilter: this.props.selectedFilter || ''
        };
    },
    handleChange: function (event) {
        var selected = event.target.value;

        if (selected) {
            var str = heroData.filterList.join(',');

            if (str.indexOf(selected) < 0) {
                heroData.filterList.push(selected);
            } else {
                heroData.filterList = _.remove(heroData.filterList, function (item) {
                    return item != selected;
                });
            }

            this.props.onFilterSubmit({ filter: heroData.filterList.join(',') });
        }
    },
    componentDidMount: function() {
        $('#hero_panel').find('div.choice ul').on('click', 'li > label > input', this.handleChange);
    },
    render: function () {
        var filter = this.state.selectedFilter;

        return (
            <div className="choice">
                <ul className="forms-inline-list">
                    <li className="label label-outline">선택</li>
                    {heroData.filter.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="checkbox" name="hero_list_filter" defaultChecked={ filter.indexOf(item.id) > -1 } value={ item.id }/>
                                { item.title }</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var HeroList = React.createClass({
    render: function () {
        return (
            <div className="hero-list">
                <ul>
                {this.props.viewList.map(function (hero) {
                    return (
                        <Heroes key={ hero.id } data={ hero } />
                    );
                })}
                </ul>
            </div>
        );
    }
});

var Heroes = React.createClass({
    getInitialState: function () {
        return {
            detail: null
        };
    },
    toggleDetail: function (e) {
        var $el = $(e.target), id, title;

        if (!$el.hasClass('detail-data') && !$el.parents().hasClass('detail-data')) {
            if ($el.attr('id')) {
                id = $el.attr('id').slice(4);
                title = $el.find('b.title').text();
            } else {
                id = $el.parent().attr('id').slice(4);
                title = $el.parent().find('b.title').text();
            }

            if (this.state.detail) {
                this.setState({ detail: null });

                $el.remove('div.detail-data');

                $el.removeClass('active');
            } else {
                if (id) {
                    $.getJSON('data/heroes/' + id + '.json', function (data) {
                        if (this.isMounted()) {
                            this.setState({ detail: data });
                        }
                    }.bind(this));

                    $el.addClass('active');

                    _gaq.push(['_trackEvent', 'Hero Detail', 'view', title]);
                }
            }
        }
    },
    componentDidMount: function() {
        if (this.props.data && this.props.data.id) {
            var id = '#' + this.props.data.id;

            $(id).on('click', this.toggleDetail);
        }
    },
    render: function () {
        var item = this.props.data;
        var data, detail, info, skill;

        if (this.state.detail) {
            data = this.state.detail;

            if (_.isArray(data['info'])) {
                info = data['info'].map(function (info) {
                    return <p className="info lead">{ info }</p>;
                })
            } else {
                info = <p className="info lead">{ data['info'] }</p>;
            }

            skill = data['skill'].map(function (skill) {
                var key = skill['key'] ? <b className="label label-black">{ skill['key'] }</b>: '';

                return <div className="data-skill">
                    <img className="data-img" src={ skill['img'] }></img>
                    <h5>{ key } { skill['title'] }</h5>
                    <cite className="story">{ skill['story'] }</cite>
                    <p className="skill">{ skill['desc'] }</p>
                    { _.isArray(skill['info']) && skill['info'].map(function (info) {
                        return <dl>
                            <dt>{ info[0] }</dt>
                            <dd>{ info[1] }</dd>
                        </dl>;
                    }) }
                    <div className="data-note">
                        <ul>{
                            _.isArray(skill['note']) && skill['note'].map(function (note) {
                                return <li>{ note }</li>;
                            })
                        }</ul>
                    </div>
                </div>;
            });

            detail = <div className="tools-alert detail-data">
                <div className="deco"></div>
                <span className="label label-yellow data-cost">{ data['type'] }</span>
                <h5>{ data['title'] }</h5>
                <cite className="story">{ data['story'] }</cite>
                <div className="data-skill">{
                    _.isArray(data['table']) && data['table'].map(function (table) {
                        return <dl>
                            <dt>{ table[0] }</dt>
                            <dd>{ table[1] }</dd>
                        </dl>;
                    })
                }</div>
                { info }
                <div className="data-note">
                    <ul>{
                        _.isArray(data['note']) && data['note'].map(function (list) {
                            return <li>{ list }</li>;
                        })
                    }</ul>
                </div>
                { skill }
            </div>;
        }

        return (
            <li id={ item.id }>
                <img src={ item['pic'] } alt={ item['subtitle'] }/>
                <b className="title">{ item.title }</b>
                <small className="subtitle">{ item['subtitle'] }</small>
                <b className={ Item.showTypeColor(item['item_category']) }>{ Item.showType(item['item_category']) }</b>
                { detail }
            </li>
        );
    }
});

var HeroPanel = React.createClass({
    getInitialState : function(){
        return {
            order: 'common',
            filter: '',
            viewList: []
        };
    },
    componentDidMount: function () {
        $.getJSON('data/heroes/heroes.json', function (data) {
            if (this.isMounted()) {
                heroData.dataList = data;
                this.setState({ viewList: data });
            }
        }.bind(this));
    },
    handleChange: function (condition) {
        this.state.order = condition.order || this.state.order;

        // filter condition
        if (Object.keys(condition).indexOf('filter') > -1) this.state.filter = condition.filter;

        // arrange by order
        var orderList = _.sortBy(heroData.dataList, heroData.orderTable[this.state.order]);
        if(this.state.order == 'speed' || this.state.order == 'armor'
            || this.state.order == 'range' || this.state.order == 'str_inc'
            || this.state.order == 'agi_inc' || this.state.order == 'int_inc') {
            orderList = _(orderList).reverse().value();
        }

        this.setState({ viewList: orderList });

        // arrange by filter
        var newList = [];

        var arr = this.state.filter ? this.state.filter.split(',') : [];
        var token = _.map(arr, function (i) {
            return heroData.filterTable[i];
        });

        if (arr.length && arr[0]) {
            for (var i = 0; i < orderList.length; i++) {
                for (var j = 0; j < token.length; j++) {
                    if (orderList[i]['skill_type'].indexOf(token[j]) > -1) {
                        newList.push(orderList[i]);

                        break;
                    }
                }
            }
            this.setState({ viewList: newList });
        } else {
            this.setState({ viewList: orderList });
        }
    },
    render: function () {
        return (
            <div className="hero-wrap">
                <PanelSelector panel="hero_selector"/>
                <h1>{ heroData.title } <small className="badge badge-black">{ this.state.viewList.length }</small></h1>
                <HeroOrderSelector onOrderSubmit={ this.handleChange }/>
                <HeroFilter onFilterSubmit={ this.handleChange }/>
                <input type="text" name="search" placeholder="Search" className="input-success width-100 instant-search"/>
                <HeroList viewList={ this.state.viewList }/>
            </div>
        );
    }
});

var heroData = {
    title: '영웅',
    dataList: [],
    order: [
        {id: 'common', title: '기본'},
        {id: 'name_kor', title: '한글'},
        {id: 'name_eng', title: '영문'},
        {id: 'speed', title: '이동속도​'},
        {id: 'armor', title: '방어도​'},
        {id: 'range', title: '사거리​'},
        {id: 'str_inc', title: '힘 증가량'},
        {id: 'agi_inc', title: '민첩 증가량'},
        {id: 'int_inc', title: '지능 증가량'}
    ],
    orderTable: {
        common: 'id',
        name_kor: 'title',
        name_eng: 'subtitle',
        speed: 'speed',
        armor: 'armor',
        range: 'range',
        str_inc: 'str_inc',
        agi_inc: 'agi_inc',
        int_inc: 'int_inc'
    },
    filter: [
        {id: 'skill1', title: '실명'},
        {id: 'skill2', title: '속박'},
        {id: 'skill3', title: '기절'},
        {id: 'skill4', title: '밀어내기'},
        {id: 'skill5', title: '둔화'},
        {id: 'skill6', title: '은신'},
        {id: 'skill7', title: '가두기'},
        {id: 'skill8', title: '돌진'},
        {id: 'skill9', title: '침묵'},
        {id: 'skill10', title: '치유'},
        {id: 'skill11', title: '집중기술'},
        {id: 'skill12', title: '도발'},
        {id: 'skill13', title: '소환'},
        {id: 'skill14', title: '띄우기'},
        {id: 'skill15', title: '무적'},
        {id: 'skill16', title: '변이'},
        {id: 'skill17', title: '순간이동'},
        {id: 'skill18', title: '방어감소'},
        {id: 'skill19', title: '저항약화'},
        {id: 'skill20', title: '마나번'},
        {id: 'skill21', title: '능력변화'},
        {id: 'skill22', title: '끌어오기'},
        {id: 'skill23', title: '흡혈'},
        {id: 'skill24', title: '치명타'},
        {id: 'skill25', title: '피해반사'}
    ],
    filterTable: {
        skill1: '실',
        skill2: '속',
        skill3: '절',
        skill4: '밀',
        skill5: '둔',
        skill6: '은',
        skill7: '가',
        skill8: '돌',
        skill9: '침',
        skill10: '힐',
        skill11: '집',
        skill12: '발',
        skill13: '환',
        skill14: '띄',
        skill15: '무',
        skill16: '변',
        skill17: '순',
        skill18: '방',
        skill19: '마',
        skill20: '번',
        skill21: '능',
        skill22: '끌',
        skill23: '흡',
        skill24: '치',
        skill25: '반'
    },
    filterList: []
};

React.render(<HeroPanel/>, document.getElementById('hero_panel'));

// 기술단, 겨울비룡, 예지자