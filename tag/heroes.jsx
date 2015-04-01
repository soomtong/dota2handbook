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
            <div className="nav nav-stats hero-list">
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
        var $el = $(e.target);
        var id = $el.attr('id').slice(4);

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
        var hero = this.props.data;
        var detail, child;
        if (this.state.detail) {
            child = React.addons.createFragment(this.state.detail);
            detail = <div className="tools-alert detail-data">{ child }</div>
        }
        return (
            <li id={ hero.id }>
                <img src={ hero.pic } alt={ hero.subtitle }/>
                <b className="title">{ hero.title }</b>
                <small className="subtitle">{ hero.subtitle }</small>
                <b className={ Hero.showTypeColor(hero.hero_category) }>{ Hero.showType(hero.hero_category) }</b>
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
        {id: 'range', title: '사거리​'}
    ],
    orderTable: {
        common: 'id',
        name_kor: 'title',
        name_eng: 'subtitle',
        speed: 'speed',
        armor: 'armor',
        range: 'range'
    },
    filter: [
        {id: 'skill1', title: '실명'},
        {id: 'skill2', title: '속박'},
        {id: 'skill3', title: '기절'},
        {id: 'skill4', title: '밀어내기'},
        {id: 'skill5', title: '둔화'}
    ],
    filterTable: {
        skill1: '명',
        skill2: '박',
        skill3: '절',
        skill4: '밀',
        skill5: '둔'
    },
    filterList: []
};

React.render(<HeroPanel/>, document.getElementById('hero_panel'));

// 체증, 민증, 지증