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

    var heroName, heroTitle, heroType, fileName, content;
    var createdFileCount = 0;

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

      content = '''
{
    "id": "${heroName}",
    "title": "${heroTitle}",
    "type": "${heroType}",
    "story": "지진술사는 골렘이나 가고일과 마찬가지로 원래 대지의 일부였으나 지금은 자유롭게 대지 위를 걷는 존재가 되었다. 그렇다고 해서 지진술사가 골렘이나 가고일처럼 주인을 섬기는 것은 아니다. 지진술사는 바위의 깊은 틈 사이에서 끝없는 잠에 빠져 있던 중 지상에서 자유로이 움직이는 생명체의 존재를 느꼈고, 호기심을 갖기 시작했다. 어느 격동의 시기에 니샤이 봉우리에서 거대한 산사태가 시작되었다. 그로 인해 강은 줄기가 바뀌고 얕은 계곡들은 끝을 모를 심연으로 변모했다. 마침내 대지의 흔들림이 멎고 먼지가 내려앉기 시작했을 때, 거대한 바위 더미를 종잇장처럼 뚫고 지진술사가 모습을 드러냈다. 그는 세속의 야수 형상을 띄고 있었으며, 스스로 라이고르 스톤후프라는 이름을 부여했다. 이제 라이고르는 피를 흘리고, 숨을 쉬며, 죽을 수도 있는 생명체가 되었다. 그러나 영혼은 여전히 대지의 것이며, 항상 곁에 두고 있는 마법 토템에 그 힘을 저장해 두고 있다. 언젠가 라이고르가 다시 흙으로 돌아갈 때가 되면, 대지는 돌아온 아들을 반갑게 맞아줄 것이다.",
    "table":[
        ["이동속도","${hero['speed']}"],
        ["회전속도","0.9"],
        ["시야","${hero['sight'].split('/')[0]}00 / ${hero['sight'].split('/')[1]}00"],
        ["공격 모션","0.467+0.863"],
        ["공격 속도","1.7"],
        ["충돌 크기","24"]
    ],
    "info": [
        "지진술사는 강력한 전투 개시자이자 무력화 스킬을 가진 영웅입니다.",
        "엄청난 사거리를 지닌 균열은 일직선상에 있는 모든 적들을 기절시킵니다. 특히 궁극기인 지진파 공명은 자신의 주변에 적이 많으면 많을수록 피해가 커지기 때문에 분신을 가진 영웅과 상대 시 엄청난 위력을 보여줍니다."
    ],
    "note": [
        "지진파 공명 > 토템 강화 > 균열의 콤보가 자주 사용됩니다.",
        "'점멸 단검'과 함께 순식간에 적진에 뛰어들어 피해를 줍니다.",
        "궁극기 스킬인 지진파 공명 때문에 많은 소환수나 환영을 사용하는 영웅의 카운터로 자주 사용됩니다."
    ],
    "skill": [
        {
            "key": "Q",
            "img": "http://cdn.dota2.com/apps/dota2/images/abilities/earthshaker_fissure_hp2.png",
            "title":"균열 Fissure",
            "story":"니샤이 토템은 구조력을 일으켜 대지를 그 중심부까지 가릅니다.",
            "desc":"강력한 토템으로 지면을 강타하여 지나갈 수 없는 돌무더기를 만들고, 직선상 적에게 피해를 주는 동시에 기절에 빠뜨립니다.",
            "info":[
                ["마나 소모","125 / 140 / 155 / 170"],
                ["쿨다운","15초"],
                ["능력","목표 지점 지정"],
                ["효과","적 유닛"],
                ["피해유형","마법"],
                ["주문면역","미관통"],
                ["피해","125 / 175 / 225 / 275"],
                ["균열 범위","1400"],
                ["균열 지속시간","8초"],
                ["기절 지속시간","1 / 1.25 / 1.5 / 1.75초"]
            ],
            "note": [
                "균열의 넓이는 80 정도입니다.",
                "날아가는 짐꾼이나 '비사지'의 소환수는 균열을 지나갈 수 있습니다."
            ]
        },
        {
            "key": "W",
            "img": "http://cdn.dota2.com/apps/dota2/images/abilities/earthshaker_enchant_totem_hp2.png",
            "title":"토템 강화 Enchant Totem",
            "story":"라이고르의 고릴라와 같은 힘은 산조차 무너뜨릴 수 있습니다.",
            "desc":"지진술사의 토템을 강화하여 다음 공격 시 추가 피해를 줍니다.",
            "info":[
                ["마나 소모","20 / 30 / 40 / 50"],
                ["쿨다운","5"],
                ["보너스 피해","100% / 200% / 300% / 400%"],
                ["지속시간","14초"]
            ],
            "note": [
                "토템 강화 다음 타격이 빗나가면 토템 강화가 소모되지 않습니다."
            ]
        }
    ]
}
''';

      if (true || !new File(fileName).existsSync()) {
        new File(fileName).writeAsStringSync(content);
        createdFileCount++;
      }
    }

    print("${createdFileCount} file" + (createdFileCount > 1 ? "s" : "") + " created.");
  });
}
