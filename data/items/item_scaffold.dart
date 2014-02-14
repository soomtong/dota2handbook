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

    var itemName, itemTitle, fileName, description, content;
    var createdFileCount = 0;

    for (var item in itemsData) {
      itemName = item['id'];
      itemTitle = item['title'] + ' ' + item['subtitle'];
      description = item['additional'] + item['desc'];
      fileName = itemName + '.json';
      content ='''
{
    "id": "${itemName}",
    "title": "${itemTitle}",
    "description": "${description}"
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
