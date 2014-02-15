/*
* simple util for generate each item's json files
* */


import 'dart:io';
import 'dart:convert';


// todo: refactoring
// 1. file reader: get id from `heroes.json`
// 2. iterate
// 3. write file if not exist
final heroesFileName = 'items.json';

void main () {
  var herosFile = new File(heroesFileName).readAsString().then((String data) {
    List itemsData = JSON.decode(data);

    var fileName, content;
    var createdFileCount = 0;

    for (var item in itemsData) {
      fileName = item['id'] + '.json';
      content ='''
{
    "id": "${item['id']}",
    "title": "${item['title'] + ' ' + item['subtitle']}",
    "desc": "${item['additional']}",
    "img": "${item['pic']}",
    "cost": "${item['price']}",
    "story": "${item['desc']}",
    "info": "${item['desc']}",
    "table": [
        ["마나", "4"],
        ["쿨다운", "4"]
    ],
    "note": [
        "100MP / 30s",
        "공격을 받으면 마나 재생이 중단된다.",
        "1초당 33마나 재생"
    ],
    "ability": "지정된 대상(더블 클릭시 자신에게 적용)",
    "affect": "아군",
    "type": "마법 또는 일반   ",
    "recipe": [
        ["clarity", "data/images/items/clarity_lg.png" , 2],
        ["bf4ury", "data/images/items/bfury_lg.png" ],
        ["blink", "data/images/items/blink_lg.png"]
    ]
}
''';

      if (new File(fileName).existsSync()) {
        new File(fileName).writeAsStringSync(content);
        createdFileCount++;
      }
    }

    print("${createdFileCount} file" + (createdFileCount > 1 ? "s" : "") + " created.");
  });
}
