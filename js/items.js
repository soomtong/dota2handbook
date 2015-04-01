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
        var $el = $(e.target), id;

        if ($el.attr('id')) {
            id = $el.attr('id').slice(4);
        } else {
            id = $el.parent().attr('id').slice(4);
        }

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
        {id: 'attack1', title: '피해'},
        {id: 'attack2', title: '흡혈'},
        {id: 'attack3', title: '방어도감소'},
        {id: 'attack4', title: '지속피해'},
        {id: 'attack5', title: '고유공격변형'},
        {id: 'speed1', title: '공속증가'},
        {id: 'speed2', title: '이속증가​'},
        {id: 'speed3', title: '공속감​소'},
        {id: 'speed4', title: '이속감소​'},
        {id: 'defence1', title: '방어도'},
        {id: 'defence2', title: '체력재생'},
        {id: 'defence3', title: '마나재생'},
        {id: 'defence4', title: '회피'},
        {id: 'defence5', title: '피해방어'},
        {id: 'defence6', title: '주문저항'},
        {id: 'skill1', title: '은신'},
        {id: 'skill2', title: '탈출'},
        {id: 'skill3', title: '회복'},
        {id: 'skill4', title: '일시강화'},
        {id: 'skill5', title: '무력화'},
        {id: 'skill6', title: '주문방어'},
        {id: 'etc1', title: '소모품'},
        {id: 'etc2', title: '오라'},
        {id: 'etc3', title: '지속효과'},
        {id: 'etc4', title: '시전기술'},
        {id: 'shop1', title: '사이드상점'},
        {id: 'shop2', title: '비밀상점'}
    ],
    filterTable: {
        stat1: '힘',
        stat2: '민',
        stat3: '지',
        stat4: '능',
        stat5: '생',
        sta6: '마',
        attack1: '피',
        attack2: '흡',
        attack3: '감',
        attack4: '돗',
        attack5: '변',
        speed1: '증',
        speed2: '이',
        speed3: '격',
        speed4: '동',
        defence1: '방',
        defence2: '재',
        defence3: '나',
        defence4: '회',
        defence5: '어',
        defence6: '저',
        skill1: '은',
        skill2: '탈',
        skill3: '복',
        skill4: '강',
        skill5: '력',
        skill6: '문',
        etc1: '품',
        etc2: '라',
        etc3: '효',
        etc4: '술',
        shop1: '사',
        shop2: '비'
    },
    filterList: []
};

React.render(React.createElement(ItemPanel, null), document.getElementById('item_panel'));
