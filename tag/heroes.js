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
    render: function () {
        var self = this;
        var selector = self.state.selectedOrder;

        return (
            <div className="order">
                <ul className="forms-inline-list">
                    <li className="label label-outline">정렬</li>
                    {heroData.order.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="radio" name="hero_list_order" defaultChecked={item.id == selector } onClick={ self.handleChange } value={ item.id }/>
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
        var str = heroData.filterList.join(',');

        if (str.indexOf(selected) < 0) {
            // add item
            heroData.filterList.push(selected);
        } else {
            // remove item
            heroData.filterList = _.remove(heroData.filterList, function (item) {
                return item != selected;
            });
        }

        this.props.onFilterSubmit({ filter: heroData.filterList.join(',') });
    },
    render: function () {
        var filter = this.state.selectedFilter;

        return (
            <div className="choice">
                <ul className="forms-inline-list">
                    <form onChange={ this.handleChange } >
                        <li className="label label-outline">필터</li>
                    {heroData.filter.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="checkbox" name="hero_list_filter" defaultChecked={ filter.indexOf(item.id) > -1 } value={ item.id }/>
                                { item.title }</label>
                            </li>
                        );
                    })}
                    </form>
                </ul>
            </div>
        );
    }
});

var Heroes = React.createClass({
    render: function () {
        return (
            <div className="nav nav-stats hero-list">
                <ul>
                {this.props.viewList.map(function (hero) {
                    return (
                        <li key={ hero.id }>
                            <img src={ hero.pic } alt={ hero.subtitle }/>
                            <b className="hero-name">{ hero.title }</b>
                            <small className="subtitle">{ hero.subtitle }</small>
                            <b className={ Hero.showTypeColor(hero.hero_category) }>{ Hero.showType(hero.hero_category) }</b>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
});

var HeroPanel = React.createClass({
    getInitialState : function(){
        return {
            order: 'common',
            filter: '',
            dataList: [],
            viewList: []
        };
    },
    componentDidMount: function () {
        $.getJSON('data/heroes/heroes.json', function (data) {
            if (this.isMounted()) {
                this.setState({ dataList: data });
                this.setState({ viewList: data });
            }
        }.bind(this));
    },
    handleChangeOrder: function (order) {
        var viewList = _.clone(this.state.dataList);
        var newList = _.sortBy(viewList, heroData.orderTable[order]);

        this.setState({ viewList: newList });

        this.state.order = order;
        console.log(this.state.order, this.state.filter);
    },
    handleChangeFilter: function (filter) {
        var viewList = _.clone(this.state.dataList), newList = [];
        var arr = filter.split(',');
        var token = _.map(arr, function (i) {
            return heroData.filterTable[i];
        });

        if (arr.length && arr[0]) {
            for (var i = 0; i < viewList.length; i++) {
                for (var j = 0; j < token.length; j++) {
                    if (viewList[i]['skill_type'].indexOf(token[j]) > -1) {
                        newList.push(viewList[i]);

                        break;
                    }
                }
            }

            this.setState({ viewList: newList });
        } else {
            this.setState({ viewList: viewList });
        }

        this.state.filter = filter;
        console.log(this.state.order, this.state.filter);
    },
    handleChange: function (condition) {
        this.state.order = condition.order || this.state.order;

        // filter condition
        if (Object.keys(condition).indexOf('filter') > -1) this.state.filter = condition.filter;

        // arrange by order
        var viewList = _.clone(this.state.dataList);
        var orderList = _.sortBy(viewList, heroData.orderTable[this.state.order]);

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
                <PanelSelector panel="hero"/>
                <h1>{ heroData.title } <small className="badge badge-black">{ this.state.viewList.length }</small></h1>
                <HeroOrderSelector onOrderSubmit={ this.handleChange }/>
                <HeroFilter onFilterSubmit={ this.handleChange }/>
                <Heroes viewList={ this.state.viewList }/>
            </div>
        );
    }
});

var heroData = {
    title: '영웅',
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
        stat1: '명',
        stat2: '박',
        stat3: '절',
        stat4: '밀',
        stat5: '둔'
    },
    filterList: []
};

React.render(<HeroPanel/>, document.getElementById('heroes_holder'));

// 체증, 민증, 지증