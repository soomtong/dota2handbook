var OrderSelector = React.createClass({
    getInitialState: function () {
        return {
            selectedOrder: this.props.selectedOrder || 'grade'
        };
    },
    handleChange: function (event) {
        console.log(event.target.value, 'order selector');
        event.preventDefault();

        this.setState({ selectedOrder: event.target.value });
        this.props.onOrderSubmit({id: event.target.value});
    },
    render: function () {
        var selector = this.state.selectedOrder;
        return (
            <div className="order">
                <ul className="forms-inline-list">
                    <form onChange={ this.handleChange } >
                    <li className="label label-outline">정렬</li>
                    {itemData.order.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="radio" name="item_list_order" checked={item.id == selector } value={ item.id }/>
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

var ItemFilter = React.createClass({
    getInitialState: function () {
        return {
            selectedFilter: this.props.selectedFilter || ['stat1']
        };
    },
    render: function () {
        var filter = this.state.selectedFilter;

        return (
            <div className="choice">
                <ul className="forms-inline-list">
                    <li className="label label-outline">필터</li>
                    {itemData.filter.map(function (item) {
                        //console.log(filter, item.id);
                        return (
                            <li key={ item.id }>
                                <label><input type="checkbox" name="item_list_filter" checked={ filter.indexOf(item.id) > -1 } value={ item.id }/>
                                { item.title }</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var Items = React.createClass({
    render: function () {
        return (
            <div className="nav nav-stats item-list">
                <ul>
                {this.props.dataList.map(function (item) {
                    return (
                        <li key={ item.id }>
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
            dataList: []
        };
    },
    componentDidMount: function () {
        $.getJSON('data/items/items.json', function (data) {
            if (this.isMounted()) {
                console.log('mount');
                this.setState({ dataList: data });
            }
        }.bind(this));
    },
    handleChange: function (order) {
        console.log(order);
        var dataList = _.clone(this.state.dataList);
        console.log(dataList[1].title);
        var orderTable = {
            'grade': 'id',
            'name_kor': 'title',
            'name_eng': 'subtitle',
            'price': 'price'
        }
        this.setState({ dataList: _.sortBy(dataList, orderTable[order.id]) })
        console.log(dataList[1].title);

    },
    render: function () {
        return (
            <div className="unit-33 items" id="items">
                <PanelSelector panel="item"/>
                <h1>아이템</h1>
                <OrderSelector onOrderSubmit={ this.handleChange }/>
                <ItemFilter filter="stat1,stat2"/>
                <Items dataList={ this.state.dataList }/>
            </div>
        );
    }
});

var itemData = {
    title: '아이템',
    order: [
        {id: 'grade', title: '등급'},
        {id: 'name_kor', title: '한글'},
        {id: 'name_eng', title: '영문'},
        {id: 'price', title: '가격'}
    ],
    filter: [
        {id: 'stat1', title: '힘'},
        {id: 'stat2', title: '민첩'},
        {id: 'stat3', title: '지능'},
        {id: 'stat4', title: '모든능력치'},
        {id: 'stat5', title: '체력'},
        {id: 'stat6', title: '마나'},
        {id: 'shop1', title: '사이드상점'},
        {id: 'shop2', title: '비밀상점'}
    ]
};

React.render(<ItemPanel/>, document.getElementById('wrap'));
