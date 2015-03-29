var PanelSelector = React.createClass({
    getInitialState : function(){
        return {
            panel: this.props.panel || 'item'
        }
    },
    render: function() {
        var selector = this.state.panel;
        var panel = [{id: 'item', title: '아이템'}, {id: 'hero', title: '영웅'}, {id: 'article', title: '문서'}];

        return (
            <div className="selector">
                <div className="forms-inline-list right">
                    {panel.map(function (i) {
                        if (i.id != selector) {
                            return <button className="btn btn-smaller btn-outline btn-round" key={ i.id }>{ i.title }</button>
                        }
                    })}
                </div>
            </div>
        );
    }
});
