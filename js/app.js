var itemData, heroData, articleData;

// load data entry
$.getJSON('data/items/items.json', function (data) {
    var dataList = _.sortBy(data, "title");
    itemData = dataList;
    //riot.mount('item-selector');
    //riot.mount('items', dataList);
});

$.getJSON('data/heroes/heroes.json', function (data) {
    var dataList = _.sortBy(data, "title");

    //riot.mount('heroes', dataList);
});

$.getJSON('data/article/articles.json', function (data) {
    var dataList = _.sortBy(data, "title");

    //riot.mount('articles', dataList);
});

// set page selector
//riot.mount('selector');