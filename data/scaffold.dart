/*
* simple util for generate each hero's json files
* */


import 'dart:io';


// todo: refactoring
// 1. file reader: get id from `heroes.json`
// 2. iterate
// 3. write file if not exist
void main () {
  var herosName = ["earthshaker", "sven", "tiny", "kunkka", "beastmaster", "dragon_knight", "rattletrap",
  "omniknight", "huskar", "alchemist", "brewmaster", "treant", "wisp", "centaur", "shredder", "bristleback",
  "tusk", "elder_titan", "legion_commander", "earth_spirit", "axe", "pudge", "sand_king", "slardar", "tidehunter",
  "skeleton_king", "life_stealer", "night_stalker", "doom_bringer", "spirit_breaker", "lycan", "chaos_knight",
  "undying", "magnataur", "abaddon", "antimage", "drow_ranger", "juggernaut", "mirana", "morphling", "phantom_lancer",
  "vengefulspirit", "riki", "sniper", "templar_assassin", "luna", "bounty_hunter", "ursa", "gyrocopter", "lone_druid",
  "naga_siren", "troll_warlord", "ember_spirit", "bloodseeker", "nevermore", "razor", "venomancer", "faceless_void",
  "phantom_assassin", "viper", "clinkz", "broodmother", "weaver", "spectre", "meepo", "nyx_assassin", "slark",
  "medusa", "crystal_maiden", "puck", "storm_spirit", "windrunner", "zuus", "lina", "shadow_shaman", "tinker",
  "furion", "enchantress", "jakiro", "chen", "silencer", "ogre_magi", "rubick", "disruptor", "keeper_of_the_light",
  "skywrath_mage", "bane", "lich", "lion", "witch_doctor", "enigma", "necrolyte", "warlock", "queenofpain",
  "death_prophet", "pugna", "dazzle", "leshrac", "dark_seer", "batrider", "ancient_apparition", "invoker",
  "obsidian_destroyer", "shadow_demon", "visage"], fileName, content, count = herosName.length;

  for (var idx = 1; idx < count; idx++) {
    fileName = herosName[idx] + '.json';
    content = '''{ "id": "${herosName[idx]}", "title": "", "description": "" }''';
    var file = new File(fileName);
    if (!file.existsSync()) {
      file.writeAsStringSync(content);
    }
  }
}
