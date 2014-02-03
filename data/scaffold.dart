/*
* simple util for generate each hero's json files
* */


import 'dart:io';
import 'dart:convert';


// todo: refactoring
// 1. file reader: get id from `heroes.json`
// 2. iterate
// 3. write file if not exist
final heroesFileName = 'heroes.json';

void main () {
  var herosFile = new File(heroesFileName).readAsString().then((String data) {
    List heroesData = JSON.decode(data);

    var heroName, fileName, content;
    var createdFileCount = 0;

    for (var hero in heroesData) {
      heroName = hero['id'];
      fileName = heroName + '.json';
      content = '''{ "id": "${heroName}", "title": "", "description": "" }''';

      if (!new File(fileName).existsSync()) {
        new File(fileName).writeAsStringSync(content);
        createdFileCount++;
      }
    }

    print("${createdFileCount} file" + (createdFileCount > 1 ? "s" : "") + " created.");
  });
}
