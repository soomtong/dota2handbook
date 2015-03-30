var ArticleOrderSelector = React.createClass({
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
                    {articleData.order.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="radio" name="article_list_order" defaultChecked={item.id == selector } onClick={ self.handleChange } value={ item.id }/>
                                { item.title }</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var ArticleFilter = React.createClass({
    getInitialState: function () {
        return {
            selectedFilter: this.props.selectedFilter || ''
        };
    },
    handleChange: function (event) {
        var selected = event.target.value;
        var str = articleData.filterList.join(',');

        if (str.indexOf(selected) < 0) {
            // add item
            articleData.filterList.push(selected);
        } else {
            // remove item
            articleData.filterList = _.remove(articleData.filterList, function (item) {
                return item != selected;
            });
        }

        this.props.onFilterSubmit({ filter: articleData.filterList.join(',') });
    },
    render: function () {
        var filter = this.state.selectedFilter;

        return (
            <div className="choice">
                <ul className="forms-inline-list">
                    <form onChange={ this.handleChange } >
                        <li className="label label-outline">필터</li>
                    {articleData.filter.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <label><input type="checkbox" name="article_list_filter" defaultChecked={ filter.indexOf(item.id) > -1 } value={ item.id }/>
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

var Articles = React.createClass({
    render: function () {
        return (
            <div className="nav nav-stats article-list">
                <ul>
                {this.props.viewList.map(function (article) {
                    return (
                        <li key={ article.id }>
                            <img src={ article.pic } alt={ article.subtitle }/>
                            <b className="article-name">{ article.title }</b>
                            <small className="subtitle">{ article.subtitle }</small>
                            <b className="badge badge-small badge-white">{ Article.showType(article.article_category) }</b>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
});

var ArticlePanel = React.createClass({
    getInitialState : function(){
        return {
            order: 'common',
            filter: '',
            dataList: [],
            viewList: []
        };
    },
    componentDidMount: function () {
        $.getJSON('data/articles/articles.json', function (data) {
            if (this.isMounted()) {
                this.setState({ dataList: data });
                this.setState({ viewList: data });
            }
        }.bind(this));
    },
    handleChange: function (condition) {
        this.state.order = condition.order || this.state.order;

        // filter condition
        if (Object.keys(condition).indexOf('filter') > -1) this.state.filter = condition.filter;

        // arrange by order
        var viewList = _.clone(this.state.dataList);
        var orderList = _.sortBy(viewList, articleData.orderTable[this.state.order]);

        this.setState({ viewList: orderList });

        // arrange by filter
        var newList = [];

        var arr = this.state.filter ? this.state.filter.split(',') : [];
        var token = _.map(arr, function (i) {
            return articleData.filterTable[i];
        });

        if (arr.length && arr[0]) {
            for (var i = 0; i < orderList.length; i++) {
                for (var j = 0; j < token.length; j++) {
                    if (orderList[i]['article_type'].indexOf(token[j]) > -1) {
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
            <div className="article-wrap">
                <PanelSelector panel="article"/>
                <h1>{ articleData.title } <small className="badge badge-black">{ this.state.viewList.length }</small></h1>
                <ArticleOrderSelector onOrderSubmit={ this.handleChange }/>
                <ArticleFilter onFilterSubmit={ this.handleChange }/>
                <Articles viewList={ this.state.viewList }/>
            </div>
        );
    }
});

var articleData = {
    title: '문서​',
    order: [
        {id: 'common', title: '기본'},
        {id: 'type', title: '종류'}
    ],
    orderTable: {
        common: 'id',
        type: 'type'
    },
    filter: [
        {id: 'type1', title: '메커니즘'},
        {id: 'type2', title: '방송/대회'},
        {id: 'type3', title: '가이드'}
    ],
    filterTable: {
        type1: '메',
        type2: '방',
        type3: '드'
    },
    filterList: []
};

React.render(<ArticlePanel/>, document.getElementById('articles_holder'));

