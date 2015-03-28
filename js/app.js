riot.mount('selector');

$.getJSON('data/article/articles.json', function (data) {
    var dataList = _.sortBy(data, "title");

    riot.mount('articles', dataList);
});

$.getJSON('data/heroes/heroes.json', function (data) {
    var dataList = _.sortBy(data, "title");

    riot.mount('heroes', dataList);
});

$.getJSON('data/items/items.json', function (data) {
    var dataList = _.sortBy(data, "title");

    riot.mount('items', dataList);
});

