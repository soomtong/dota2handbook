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

void main() {
    new File(heroesFileName).readAsString().then((String data) {
        List heroesData = JSON.decode(data);

        var heroName, heroTitle, heroType, fileName, selectedHero, content, skill, skills;
        var createdFileCount = 0;

        new File('heroAllData.json').readAsString().then((String data) {
            List heroSkillData = JSON.decode(data);

            print("match hero list ${heroSkillData.length}");

            for (var hero in heroesData) {
                heroName = hero['id'].substring(4);
                heroTitle = hero['title'] + ' ' + hero['subtitle'];
                fileName = heroName + '.json';

                switch (hero['hero_category']) {
                    case 1:
                        heroType = '힘';
                        break;
                    case 2:
                        heroType = '민';
                        break;
                    case 3:
                        heroType = '지';
                        break;
                }

                skills = [];

                print(fileName);

                for (var x in heroSkillData) {
                    if (x['id'] == hero['title']) {
                        selectedHero = x['data'];

                        for (var s in selectedHero['skill']) {
                            var info = "", index, sp, b = [];
                            var temp = [];

                            if (s['info1'].length > 0) {
                                index = s['info1'].indexOf('쿨다운');

                                if (index > -1) {
                                    b = s['info1'].substring(0, index).split(':');

                                    if (b.length > 1) {
                                        b[0] = b[0] != null ? "\"${b[0].trim()}\"" : '';
                                        b[1] = b[1] != null ? "\"${b[1].trim()}\"" : '';
                                        print(b[0]);
                                        temp.add(b);
                                    }

                                    b = s['info1'].substring(index).split(':');

                                    if (b.length > 1) {
                                        b[0] = b[0] != null ? "\"${b[0].trim()}\"" : '';
                                        b[1] = b[1] != null ? "\"${b[1].trim()}\"" : '';
                                        print(b[0]);
                                        temp.add(b);
                                    }
                                }
                            }

                            sp = s['info2'].join(",");

                            s['info2'].forEach((item) {
                                b = item.split(':');

                                if (b.length > 1) {
                                    b[0] = b[0] != null ? "\"${b[0].trim()}\"" : '';
                                    b[1] = b[1] != null ? "\"${b[1].trim()}\"" : '';
                                    print(b[0]);
                                    temp.add(b);
                                }
                            });

                            info = temp.join(',\n                ');

                            skill = '''

        {
            "key": "Q",
            "img": "data/images/skill/earthshaker_fissure_hp2.png",
            "title":"${s['title']} Fissure",
            "story":"${s['desc']}",
            "desc":"${s['story']}",
            "info": [
                ${info}
            ]
            ,
            "note": [
                "",
                ""
            ]
        }
    ''';
                            skills.add(skill);
                        }

                        content = '''
{
    "id": "${heroName}",
    "title": "${heroTitle}",
    "type": "${heroType}",
    "story": "${selectedHero['story']}",
    "table":[
        ["이동속도","${hero['speed']}"],
        ["회전속도","0.9"],
        ["시야","${hero['sight'].split('/')[0]}00 / ${hero['sight'].split('/')[1]}00"],
        ["공격 모션","0.467+0.863"],
        ["공격 속도","1.7"]
    ],
    "info": [
        "",
        ""
    ],
    "note": [
        ""
    ],
    "skill": ${skills}
}
''';

                        if (true || !new File(fileName).existsSync()) {
                            new File(fileName).writeAsStringSync(content);
//              print(content);
                            createdFileCount++;
                        }
                    } else {

                    }
                }


            }
            print("${createdFileCount} file" + (createdFileCount > 1 ? "s" : "") + " created.");

        });
    });
}
