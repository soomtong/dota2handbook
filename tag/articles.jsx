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
    componentDidMount: function() {
        $('#article_panel').find('div.order ul').on('click', 'li > label', this.handleChange);
    },
    render: function () {
        var selector = this.state.selectedOrder;

        return (
            <div className="order">
                <ul className="forms-inline-list">
                    <li className="label label-outline">정렬</li>
                    {articleData.order.map(function (article) {
                        return (
                            <li key={ article.id }>
                                <label><input type="radio" name="article_list_order" defaultChecked={article.id == selector } value={ article.id }/>
                                { article.title }</label>
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

        if (selected) {
            var str = articleData.filterList.join(',');

            if (str.indexOf(selected) < 0) {
                articleData.filterList.push(selected);
            } else {
                articleData.filterList = _.remove(articleData.filterList, function (article) {
                    return article != selected;
                });
            }

            this.props.onFilterSubmit({ filter: articleData.filterList.join(',') });
        }
    },
    componentDidMount: function() {
        $('#article_panel').find('div.choice ul').on('click', 'li > label > input', this.handleChange);
    },
    render: function () {
        var filter = this.state.selectedFilter;

        return (
            <div className="choice">
                <ul className="forms-inline-list">
                    <li className="label label-outline">선택</li>
                    {articleData.filter.map(function (article) {
                        return (
                            <li key={ article.id }>
                                <label><input type="checkbox" name="article_list_filter" defaultChecked={ filter.indexOf(article.id) > -1 } value={ article.id }/>
                                { article.title }</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var ArticleList = React.createClass({
    render: function () {
        return (
            <div className="nav nav-stats article-list">
                <ul>
                {this.props.viewList.map(function (article) {
                    return (
                        <Articles key={ article.id } data={ article } />
                    );
                })}
                </ul>
            </div>
        );
    }
});

var Articles = React.createClass({
    getInitialState: function () {
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
                $.getJSON('data/articles/' + id + '.json', function (data) {
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
        var article = this.props.data;
        var detail, child;
        if (this.state.detail) {
            child = React.addons.createFragment(this.state.detail);
            detail = <div className="tools-alert detail-data">{ child }</div>
        }
        return (
            <li id={ article.id }>
                <img src={ article.pic } alt={ article.subtitle }/>
                <b className="title">{ article.title }</b>
                <small className="subtitle">{ article.subtitle }</small>
                <b className="badge badge-small badge-white">{ Article.showType(article.article_category) }</b>
            { detail }
            </li>
        );
    }
});

var ArticlePanel = React.createClass({
    getInitialState : function(){
        return {
            order: 'common',
            filter: '',
            viewList: []
        };
    },
    componentDidMount: function () {
        $.getJSON('data/articles/articles.json', function (data) {
            if (this.isMounted()) {
                articleData.dataList = data;
                this.setState({ viewList: data });
            }
        }.bind(this));
    },
    handleChange: function (condition) {
        this.state.order = condition.order || this.state.order;

        // filter condition
        if (Object.keys(condition).indexOf('filter') > -1) this.state.filter = condition.filter;

        // arrange by order
        var orderList = _.sortBy(articleData.dataList, articleData.orderTable[this.state.order]);

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
                <PanelSelector panel="article_selector"/>
                <h1>{ articleData.title } <small className="badge badge-black">{ this.state.viewList.length }</small></h1>
                <ArticleOrderSelector onOrderSubmit={ this.handleChange }/>
                <ArticleFilter onFilterSubmit={ this.handleChange }/>
                <input type="text" name="search" placeholder="Search" className="input-success width-100 instant-search"/>
                <ArticleList viewList={ this.state.viewList }/>
            </div>
        );
    }
});

var articleData = {
    title: '문서​',
    dataList: [],
    order: [
        {id: 'common', title: '기본'},
        {id: 'type', title: '종류'}
    ],
    orderTable: {
        common: 'id',
        type: 'article_category'
    },
    filter: [
        {id: 'type1', title: '메커니즘'},
        {id: 'type2', title: '리그'},
        {id: 'type3', title: '가이드'}
    ],
    filterTable: {
        type1: '메',
        type2: '방',
        type3: '드'
    },
    filterList: []
};

React.render(<ArticlePanel/>, document.getElementById('article_panel'));

