var PanelSelector = React.createClass({
    getInitialState : function(){
        return {
            panel: this.props.panel || 'item_selector'
        }
    },
    swapPanel: function (e) {
        var before = $(e.target).parent().parent().parent().parent().attr('id').split('_')[0];
        var after = $(e.target).attr('id').split('_')[0];
        var index = $(e.target).attr('rel');

        Panel.swapPanel(before, after, index);
    },
    render: function() {
        var selector = this.props.panel;
        var self = this;
        var index = [1, -1];    // for swap direction

        return (
            <div className="selector">
                <div className="forms-inline-list right">
                    {panelData.map(function (panel) {
                        if (panel.id != selector) {
                            return <button className="btn btn-smaller btn-outline btn-round" key={ panel.id } id={ panel.id } rel={ index.pop() } onClick={ self.swapPanel }>{ panel.title }</button>;
                        }
                    })}
                </div>
            </div>
        );
    }
});

var panelData = [
    {id: 'item_selector', title: '아이템'},
    {id: 'hero_selector', title: '영웅'},
    {id: 'article_selector', title: '문서'}
];