var PanelSelector = React.createClass({displayName: "PanelSelector",
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
    componentDidMount: function() {
        $('#wrap').find('.main-panel').on('click', '.selector button', this.swapPanel);
    },
    render: function() {
        var selector = this.props.panel;
        var index = [1, -1];    // for swap direction

        return (
            React.createElement("div", {className: "selector"}, 
                React.createElement("div", {className: "forms-inline-list right"}, 
                    panelData.map(function (panel) {
                        if (panel.id != selector) {
                            return React.createElement("button", {className:  Panel.showTypeColor(panel.id), key:  panel.id, id:  panel.id, rel:  index.pop() },  panel.title);
                        }
                    })
                )
            )
        );
    }
});

var panelData = [
    {id: 'item_selector', title: '아이템'},
    {id: 'hero_selector', title: '영웅'},
    {id: 'article_selector', title: '문서'}
];