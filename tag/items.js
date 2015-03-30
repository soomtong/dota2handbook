var ItemOrderSelector = React.createClass({
    getInitialState: function () {
        return {
            selectedOrder: this.props.selectedOrder || 'grade'
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
                    {itemData.order.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="radio" name="item_list_order" defaultChecked={item.id == selector } onClick={ self.handleChange } value={ item.id }/>
                                { item.title }</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var ItemFilter = React.createClass({
    getInitialState: function () {
        return {
            selectedFilter: this.props.selectedFilter || ''
        };
    },
    handleChange: function (event) {
        var selected = event.target.value;
        var str = itemData.filterList.join(',');

        if (str.indexOf(selected) < 0) {
            // add item
            itemData.filterList.push(selected);
        } else {
            // remove item
            itemData.filterList = _.remove(itemData.filterList, function (item) {
                return item != selected;
            });
        }

        this.props.onFilterSubmit({ filter: itemData.filterList.join(',') });
    },
    render: function () {
        var filter = this.state.selectedFilter;

        return (
            <div className="choice">
                <ul className="forms-inline-list">
                    <form onChange={ this.handleChange } >
                    <li className="label label-outline">필터</li>
                    {itemData.filter.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="checkbox" name="item_list_filter" defaultChecked={ filter.indexOf(item.id) > -1 } value={ item.id }/>
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

var Items = React.createClass({
    handleClick: function (e) {
        console.log(e.target);
        console.log(this);
    },
    render: function () {
        var self = this;
        return (
            <div className="nav nav-stats item-list">
                <ul>
                {this.props.viewList.map(function (item) {
                    return (
                        <li key={ item.id } onClick={ self.handleClick }>
                            <img src={ item.pic } alt={ item.subtitle }/>
                            <b className="item-name">{ item.title }</b>
                            <small className="subtitle">{ item.subtitle }</small>
                            <b className="badge badge-small badge-black">{ Item.showType(item.item_category) }</b>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
});

var ItemPanel = React.createClass({
    getInitialState : function(){
        return {
            order: 'grade',
            filter: '',
            viewList: []
        };
    },
    componentDidMount: function () {
        $.getJSON('data/items/items.json', function (data) {
            if (this.isMounted()) {
                itemData.dataList = data;
                this.setState({ viewList: data });
            }
        }.bind(this));
    },
    handleChange: function (condition) {
        this.state.order = condition.order || this.state.order;

        // filter condition
        if (Object.keys(condition).indexOf('filter') > -1) this.state.filter = condition.filter;

        // arrange by order
        var orderList = _.sortBy(itemData.dataList, itemData.orderTable[this.state.order]);

        this.setState({ viewList: orderList });

        // arrange by filter
        var newList = [];

        var arr = this.state.filter ? this.state.filter.split(',') : [];
        var token = _.map(arr, function (i) {
            return itemData.filterTable[i];
        });

        if (arr.length && arr[0]) {
            for (var i = 0; i < orderList.length; i++) {
                for (var j = 0; j < token.length; j++) {
                    if (orderList[i]['spec_type'].indexOf(token[j]) > -1) {
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
            <div className="item-wrap">
                <PanelSelector panel="item"/>
                <h1>{ itemData.title } <small className="badge badge-black">{ this.state.viewList.length }</small></h1>
                <ItemOrderSelector onOrderSubmit={ this.handleChange }/>
                <ItemFilter onFilterSubmit={ this.handleChange }/>
                <Items viewList={ this.state.viewList }/>
            </div>
        );
    }
});

var itemData = {
    title: '아이템',
    dataList: [],
    order: [
        {id: 'grade', title: '등급'},
        {id: 'name_kor', title: '한글'},
        {id: 'name_eng', title: '영문'},
        {id: 'price', title: '가격'}
    ],
    orderTable: {
        grade: 'id',
        name_kor: 'title',
        name_eng: 'subtitle',
        price: 'price'
    },
    filter: [
        {id: 'stat1', title: '힘'},
        {id: 'stat2', title: '민첩'},
        {id: 'stat3', title: '지능'},
        {id: 'stat4', title: '모든능력치'},
        {id: 'stat5', title: '체력'},
        {id: 'stat6', title: '마나'},
        {id: 'shop1', title: '사이드상점'},
        {id: 'shop2', title: '비밀상점'}
    ],
    filterTable: {
        stat1: '힘',
        stat2: '민',
        stat3: '지'
    },
    filterList: []
};

React.render(<ItemPanel/>, document.getElementById('items_holder'));
