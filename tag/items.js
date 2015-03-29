var OrderSelector = React.createClass({
    render: function () {
        return (
            <div className="order">
                <ul className="forms-inline-list">
                    <li>
                        <input type="radio" name="item_list_order" id="radio-item-grade"/>
                        <label htmlFor="radio-item-grade">등급</label>
                    </li>
                    <li>
                        <input type="radio" name="item_list_order" id="radio-item-name1"/>
                        <label htmlFor="radio-item-name1">한글 이름</label>
                    </li>
                    <li>
                        <input type="radio" name="item_list_order" id="radio-item-name2"/>
                        <label htmlFor="radio-item-name2">영문 이름</label>
                    </li>
                    <li>
                        <input type="radio" name="item_list_order" id="radio-item-price"/>
                        <label htmlFor="radio-item-price">가격</label>
                    </li>
                </ul>
            </div>
        );
    }
});

var ItemFilter = React.createClass({
    render: function () {
        return (
            <div className="choice">
                <ul className="forms-inline-list">
                    <li>
                        <input type="checkbox" name="checkbox-1" id="checkbox-1"/>
                        <label htmlFor="checkbox-1">힘</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checkbox-2" id="checkbox-2"/>
                        <label htmlFor="checkbox-2">민첩</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checkbox-3" id="checkbox-3"/>
                        <label htmlFor="checkbox-3">지능</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checkbox-4" id="checkbox-4"/>
                        <label htmlFor="checkbox-4">모든능력치</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checkbox-5" id="checkbox-5"/>
                        <label htmlFor="checkbox-5">체력</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checkbox-6" id="checkbox-6"/>
                        <label htmlFor="checkbox-6">마나</label>
                    </li>
                    <br/>
                    <li>
                        <input type="checkbox" name="item-shop-side" id="item-shop-side"/>
                        <label htmlFor="item-shop-side">사이드 상점</label>
                    </li>
                    <li>
                        <input type="checkbox" name="item-shop-secret" id="item-shop-secret"/>
                        <label htmlFor="item-shop-secret">비밀 상점</label>
                    </li>
                </ul>
            </div>
        );
    }
});

var Items = React.createClass({
    getInitialState : function(){
        return {
            dataList: []
        }
    },
    componentDidMount: function () {
        $.getJSON('data/items/items.json', function (data) {
            if (this.isMounted()) {
                console.log('mount');
                this.setState({ dataList: data });
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div className="nav nav-stats item-list">
                <ul>
                {
                    this.state.dataList.map(function (item) {
                        return (
                            <li key={ item.id }>
                                <img src={ item.pic } alt={ item.subtitle }/>
                                <b className="item-name">{ item.title }</b>
                                <small className="subtitle">{ item.subtitle }</small>
                                <b className="badge badge-small badge-black">{ Item.showType(item.item_category) }</b>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
});

var ItemPanel = React.createClass({
    render: function () {
        return (
            <div className="unit-33 items" id="items">
                <PanelSelector panel="item"/>
                <h1>아이템</h1>
                <OrderSelector/>
                <ItemFilter/>
                <Items/>
            </div>
        );
    }
});

React.render(<ItemPanel/>, document.getElementById('wrap'));
