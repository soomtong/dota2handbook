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

        e.preventDefault();

        Panel.swapPanel(before, after, index);

        _gaq.push(['_trackEvent', 'Panel', 'swap', after]);

        // re queue panel selector order
        var id = this.state.panel;
        var temp = _.remove(panelData, function (panel) {
            return panel.id == id;
        });

        panelData.push({ id: temp[0].id, title: temp[0].title });
    },
    componentDidMount: function() {
        var id = ['#', this.state.panel.split('_')[0], '_panel'].join('');
        $(id).on('click', '.selector button', this.swapPanel);
    },
    render: function() {
        var selector = this.props.panel;
        var index = [1, -1];    // for swap direction

        return (
            <div className="selector">
                <div className="forms-inline-list right">
                    {panelData.map(function (panel) {
                        if (panel.id != selector) {
                            return <button className={ Panel.showTypeColor(panel.id) } key={ panel.id } id={ panel.id } rel={ index.pop() }>{ panel.title }</button>;
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