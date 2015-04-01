var ItemOrderSelector = React.createClass({displayName: "ItemOrderSelector",
    getInitialState: function () {
        return {
            selectedOrder: this.props.selectedOrder || 'grade'
        };
    },
    handleChange: function (event) {
        this.state.selectedOrder = event.target.value;
        this.props.onOrderSubmit({ order: event.target.value });
    },
    componentDidMount: function() {
        $('#item_panel').find('div.order ul').on('click', 'li > label', this.handleChange);
    },
    render: function () {
        var selector = this.state.selectedOrder;

        return (
            React.createElement("div", {className: "order"}, 
                React.createElement("ul", {className: "forms-inline-list"}, 
                    React.createElement("li", {className: "label label-outline"}, "정렬"), 
                    itemData.order.map(function (item) {
                        return (
                            React.createElement("li", {key:  item.id}, 
                                React.createElement("label", null, React.createElement("input", {type: "radio", name: "item_list_order", defaultChecked: item.id == selector, value:  item.id}), 
                                 item.title)
                            )
                        );
                    })
                )
            )
        );
    }
});

var ItemFilter = React.createClass({displayName: "ItemFilter",
    getInitialState: function () {
        return {
            selectedFilter: this.props.selectedFilter || ''
        };
    },
    handleChange: function (event) {
        var selected = event.target.value;

        if (selected) {
            var str = itemData.filterList.join(',');

            if (str.indexOf(selected) < 0) {
                itemData.filterList.push(selected);
            } else {
                itemData.filterList = _.remove(itemData.filterList, function (item) {
                    return item != selected;
                });
            }

            this.props.onFilterSubmit({ filter: itemData.filterList.join(',') });
        }
    },
    componentDidMount: function() {
        $('#item_panel').find('div.choice ul').on('click', 'li > label > input', this.handleChange);
    },
    render: function () {
        var filter = this.state.selectedFilter;

        return (
            React.createElement("div", {className: "choice"}, 
                React.createElement("ul", {className: "forms-inline-list"}, 
                    React.createElement("li", {className: "label label-outline"}, "선택"), 
                    itemData.filter.map(function (item) {
                        return (
                            React.createElement("li", {key:  item.id}, 
                                React.createElement("label", null, React.createElement("input", {type: "checkbox", name: "item_list_filter", defaultChecked:  filter.indexOf(item.id) > -1, value:  item.id}), 
                                 item.title)
                            )
                        );
                    })
                )
            )
        );
    }
});

var ItemList = React.createClass({displayName: "ItemList",
    render: function () {
        return (
            React.createElement("div", {className: "nav nav-stats item-list"}, 
                React.createElement("ul", null, 
                this.props.viewList.map(function (item) {
                    return (
                        React.createElement(Items, {key:  item.id, data:  item })
                    );
                })
                )
            )
        );
    }
});

var Items = React.createClass({displayName: "Items",
    getInitialState : function(){
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
                $.getJSON('data/items/' + id + '.json', function (data) {
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
        var item = this.props.data;
        var detail, child;
        if (this.state.detail) {
            child = React.addons.createFragment(this.state.detail);
            detail = React.createElement("div", {className: "tools-alert detail-data"},  child )
        }
        return (
            React.createElement("li", {id:  item.id}, 
                React.createElement("img", {src:  item.pic, alt:  item.subtitle}), 
                React.createElement("b", {className: "title"},  item.title), 
                React.createElement("small", {className: "subtitle"},  item.subtitle), 
                React.createElement("b", {className:  Item.showTypeColor(item.item_category) },  Item.showType(item.item_category) ), 
             detail 
            )
        );
    }
});

var ItemPanel = React.createClass({displayName: "ItemPanel",
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
            React.createElement("div", {className: "item-wrap"}, 
                React.createElement(PanelSelector, {panel: "item_selector"}), 
                React.createElement("h1", null,  itemData.title, " ", React.createElement("small", {className: "badge badge-black"},  this.state.viewList.length)), 
                React.createElement(ItemOrderSelector, {onOrderSubmit:  this.handleChange}), 
                React.createElement(ItemFilter, {onFilterSubmit:  this.handleChange}), 
                React.createElement("input", {type: "text", name: "search", placeholder: "Search", className: "input-success width-100 instant-search"}), 
                React.createElement(ItemList, {viewList:  this.state.viewList})
            )
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

React.render(React.createElement(ItemPanel, null), document.getElementById('item_panel'));
