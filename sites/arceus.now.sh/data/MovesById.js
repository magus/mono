// https://www.serebii.net/legendsarceus/newattacks.shtml
// https://rankedboost.com/pokemon-legends-arceus/moves/

// A lot of moves have incorrect power, acc, pp and effect however typing should be correct

// prettier-ignore
exports.Lookup = {
  1: {"name":"Self-Destruct","id":1,"type":"Normal","class":"Physical","power":200,"acc":100,"pp":5,"effect":"User faints."},
  2: {"name":"Giga Impact","id":2,"type":"Normal","class":"Physical","power":150,"acc":90,"pp":5,"effect":"User must recharge next turn."},
  3: {"name":"Head Smash","id":3,"type":"Rock","class":"Physical","power":150,"acc":80,"pp":5,"effect":"User receives recoil damage."},
  4: {"name":"Hyper Beam","id":4,"type":"Normal","class":"Special","power":150,"acc":90,"pp":5,"effect":"User must recharge next turn."},
  5: {"name":"Roar of Time","id":5,"type":"Dragon","class":"Special","power":150,"acc":90,"pp":5,"effect":"User must recharge next turn."},
  6: {"name":"Draco Meteor","id":6,"type":"Dragon","class":"Special","power":130,"acc":90,"pp":5,"effect":"Sharply lowers user's Special Attack."},
  7: {"name":"Leaf Storm","id":7,"type":"Grass","class":"Special","power":130,"acc":90,"pp":5,"effect":"Sharply lowers user's Special Attack."},
  8: {"name":"Overheat","id":8,"type":"Fire","class":"Special","power":130,"acc":90,"pp":5,"effect":"Sharply lowers user's Special Attack."},
  9: {"name":"Steel Beam","id":9,"type":"Steel","class":"Special","power":140,"acc":95,"pp":5,"effect":"User loses 50% of its HP."},
  10: {"name":"Blizzard","id":10,"type":"Ice","class":"Special","power":110,"acc":70,"pp":5,"effect":"May freeze opponent."},
  11: {"name":"Brave Bird","id":11,"type":"Flying","class":"Physical","power":120,"acc":100,"pp":15,"effect":"User receives recoil damage."},
  12: {"name":"Chloroblast","id":12,"type":"Grass","class":"Special","power":120,"acc":95,"pp":5,"effect":"The user launches its amassed chlorophyll to inflict damage on the target. This also damages the user and lowers the user’s action speed."},
  13: {"name":"Close Combat","id":13,"type":"Fighting","class":"Physical","power":120,"acc":100,"pp":5,"effect":"Lowers user's Defense and Special Defense."},
  14: {"name":"Double-Edge","id":14,"type":"Normal","class":"Physical","power":120,"acc":100,"pp":15,"effect":"User receives recoil damage."},
  15: {"name":"Fire Blast","id":15,"type":"Fire","class":"Special","power":110,"acc":85,"pp":5,"effect":"May burn opponent."},
  16: {"name":"Flare Blitz","id":16,"type":"Fire","class":"Physical","power":120,"acc":100,"pp":15,"effect":"User receives recoil damage. May burn opponent."},
  17: {"name":"Hurricane","id":17,"type":"Flying","class":"Special","power":110,"acc":70,"pp":10,"effect":"May confuse opponent."},
  18: {"name":"Hydro Pump","id":18,"type":"Water","class":"Special","power":110,"acc":80,"pp":5,"effect":"The target is blasted by a huge volume of water launched under great pressure."},
  19: {"name":"Megahorn","id":19,"type":"Bug","class":"Physical","power":120,"acc":85,"pp":10,"effect":"Using its tough and impressive horn, the user rams into the target to inflict damage."},
  20: {"name":"Outrage","id":20,"type":"Dragon","class":"Physical","power":120,"acc":100,"pp":10,"effect":"User attacks for 2-3 turns but then becomes confused."},
  21: {"name":"Petal Dance","id":21,"type":"Grass","class":"Special","power":120,"acc":100,"pp":10,"effect":"User attacks for 2-3 turns but then becomes confused."},
  22: {"name":"Seed Flare","id":22,"type":"Grass","class":"Special","power":120,"acc":85,"pp":5,"effect":"May lower opponent's Special Defense."},
  23: {"name":"Shadow Force","id":23,"type":"Ghost","class":"Physical","power":120,"acc":100,"pp":5,"effect":"Disappears on first turn, attacks on second. Can strike through Protect/Detect."},
  24: {"name":"Thunder","id":24,"type":"Electric","class":"Special","power":110,"acc":70,"pp":10,"effect":"May paralyze opponent."},
  25: {"name":"Volt Tackle","id":25,"type":"Electric","class":"Physical","power":120,"acc":100,"pp":15,"effect":"User receives recoil damage. May paralyze opponent."},
  26: {"name":"Wood Hammer","id":26,"type":"Grass","class":"Physical","power":120,"acc":100,"pp":15,"effect":"User receives recoil damage."},
  27: {"name":"Aqua Tail","id":27,"type":"Water","class":"Physical","power":90,"acc":90,"pp":10,"effect":"The user attacks by swinging its tail as if it were a vicious wave in a raging storm."},
  28: {"name":"Bleakwind Storm","id":28,"type":"Flying","class":"Special","power":95,"acc":80,"pp":5,"effect":"The user attacks with savagely cold winds that cause both body and spirit to tremble. This may also leave the target with frostbite."},
  29: {"name":"Bug Buzz","id":29,"type":"Bug","class":"Special","power":90,"acc":100,"pp":10,"effect":"May lower opponent's Special Defense."},
  30: {"name":"Earth Power","id":30,"type":"Ground","class":"Special","power":90,"acc":100,"pp":10,"effect":"May lower opponent's Special Defense."},
  31: {"name":"Energy Ball","id":31,"type":"Grass","class":"Special","power":90,"acc":100,"pp":10,"effect":"May lower opponent's Special Defense."},
  32: {"name":"Flamethrower","id":32,"type":"Fire","class":"Special","power":90,"acc":100,"pp":15,"effect":"May burn opponent."},
  33: {"name":"Headlong Rush","id":33,"type":"Ground","class":"Physical","power":100,"acc":100,"pp":5,"effect":"The user smashes into the target in a full-body tackle. This also lowers the user’s defensive stats."},
  34: {"name":"High Horsepower","id":34,"type":"Ground","class":"Physical","power":95,"acc":95,"pp":10,"effect":"The user fiercely attacks the target using its entire body."},
  35: {"name":"Ice Beam","id":35,"type":"Ice","class":"Special","power":90,"acc":100,"pp":10,"effect":"May freeze opponent."},
  36: {"name":"Iron Tail","id":36,"type":"Steel","class":"Physical","power":100,"acc":75,"pp":15,"effect":"May lower opponent's Defense."},
  37: {"name":"Judgment","id":37,"type":"Normal","class":"Special","power":100,"acc":100,"pp":10,"effect":"Type depends on the Arceus Plate being held."},
  38: {"name":"Leaf Blade","id":38,"type":"Grass","class":"Physical","power":90,"acc":100,"pp":15,"effect":"High critical hit ratio."},
  39: {"name":"Magma Storm","id":39,"type":"Fire","class":"Special","power":100,"acc":75,"pp":5,"effect":"Traps opponent, damaging them for 4-5 turns."},
  40: {"name":"Moonblast","id":40,"type":"Fairy","class":"Special","power":95,"acc":100,"pp":15,"effect":"May lower opponent's Special Attack."},
  41: {"name":"Mountain Gale","id":41,"type":"Ice","class":"Physical","power":100,"acc":85,"pp":5,"effect":"The user hurls giant chunks of ice at the target to inflict damage."},
  42: {"name":"Play Rough","id":42,"type":"Fairy","class":"Physical","power":90,"acc":90,"pp":10,"effect":"May lower opponent's Attack."},
  43: {"name":"Psychic","id":43,"type":"Psychic","class":"Special","power":90,"acc":100,"pp":10,"effect":"May lower opponent's Special Defense."},
  44: {"name":"Raging Fury","id":44,"type":"Fire","class":"Physical","power":90,"acc":85,"pp":10,"effect":"The user rampages and spews vicious flames to inflict damage on the target, then becomes fixated on using this move."},
  45: {"name":"Sandsear Storm","id":45,"type":"Ground","class":"Special","power":95,"acc":80,"pp":5,"effect":"The user attacks by wrapping the target in fierce winds and searingly hot sand. This also leaves the target with a burn."},
  46: {"name":"Sludge Bomb","id":46,"type":"Poison","class":"Special","power":90,"acc":100,"pp":10,"effect":"May poison opponent."},
  47: {"name":"Spacial Rend","id":47,"type":"Dragon","class":"Special","power":100,"acc":95,"pp":5,"effect":"High critical hit ratio."},
  48: {"name":"Springtide Storm","id":48,"type":"Fairy","class":"Special","power":95,"acc":80,"pp":5,"effect":"The user attacks by wrapping the target in fierce winds brimming with love and hate. This move’s additional effects depend on the user’s form."},
  49: {"name":"Stone Edge","id":49,"type":"Rock","class":"Physical","power":100,"acc":80,"pp":5,"effect":"High critical hit ratio."},
  50: {"name":"Thunderbolt","id":50,"type":"Electric","class":"Special","power":90,"acc":100,"pp":15,"effect":"May paralyze opponent."},
  51: {"name":"Wild Charge","id":51,"type":"Electric","class":"Physical","power":90,"acc":100,"pp":15,"effect":"User receives recoil damage."},
  52: {"name":"Wildbolt Storm","id":52,"type":"Electric","class":"Special","power":95,"acc":80,"pp":5,"effect":"The user summons a thunderous tempest and savagely attacks with lightning and wind. This may also leave the target with paralysis."},
  53: {"name":"Air Slash","id":53,"type":"Flying","class":"Special","power":75,"acc":95,"pp":20,"effect":"May cause flinching."},
  54: {"name":"Aura Sphere","id":54,"type":"Fighting","class":"Special","power":80,"acc":null,"pp":20,"effect":"Ignores Accuracy and Evasiveness."},
  55: {"name":"Cross Poison","id":55,"type":"Poison","class":"Physical","power":70,"acc":100,"pp":20,"effect":"High critical hit ratio. May poison opponent."},
  56: {"name":"Crunch","id":56,"type":"Dark","class":"Physical","power":80,"acc":100,"pp":15,"effect":"May lower opponent's Defense."},
  57: {"name":"Dark Pulse","id":57,"type":"Dark","class":"Special","power":80,"acc":100,"pp":15,"effect":"May cause flinching."},
  58: {"name":"Dazzling Gleam","id":58,"type":"Fairy","class":"Special","power":80,"acc":100,"pp":10,"effect":"Hits all adjacent opponents."},
  59: {"name":"Dragon Claw","id":59,"type":"Dragon","class":"Physical","power":80,"acc":100,"pp":15,"effect":"The user slashes the target with huge, sharp claws. This move has a heightened chance of landing a critical hit."},
  60: {"name":"Dragon Pulse","id":60,"type":"Dragon","class":"Special","power":85,"acc":100,"pp":10,"effect":"The target is attacked with a shock wave generated by the user’s gaping mouth. This attack never misses."},
  61: {"name":"Drain Punch","id":61,"type":"Fighting","class":"Physical","power":75,"acc":100,"pp":10,"effect":"User recovers half the HP inflicted on opponent."},
  62: {"name":"Esper Wing","id":62,"type":"Psychic","class":"Special","power":75,"acc":90,"pp":10,"effect":"The user slashes the target with aura-enriched wings. This also raises the user’s action speed. This move has a heightened chance of landing a critical hit."},
  63: {"name":"Extrasensory","id":63,"type":"Psychic","class":"Special","power":80,"acc":100,"pp":20,"effect":"May cause flinching."},
  64: {"name":"Fire Punch","id":64,"type":"Fire","class":"Physical","power":75,"acc":100,"pp":15,"effect":"May burn opponent."},
  65: {"name":"Flash Cannon","id":65,"type":"Steel","class":"Special","power":80,"acc":100,"pp":10,"effect":"May lower opponent's Special Defense."},
  66: {"name":"Ice Punch","id":66,"type":"Ice","class":"Physical","power":75,"acc":100,"pp":15,"effect":"May freeze opponent."},
  67: {"name":"Icicle Crash","id":67,"type":"Ice","class":"Physical","power":85,"acc":90,"pp":10,"effect":"May cause flinching."},
  68: {"name":"Iron Head","id":68,"type":"Steel","class":"Physical","power":80,"acc":100,"pp":15,"effect":"May cause flinching."},
  69: {"name":"Leech Life","id":69,"type":"Bug","class":"Physical","power":80,"acc":100,"pp":10,"effect":"User recovers half the HP inflicted on opponent."},
  70: {"name":"Liquidation","id":70,"type":"Water","class":"Physical","power":85,"acc":100,"pp":10,"effect":"The user slams into the target using a full-force blast of water. This may also lower the target's Defense stat."},
  71: {"name":"Mystical Fire","id":71,"type":"Fire","class":"Special","power":75,"acc":100,"pp":10,"effect":"Lowers opponent's Special Attack."},
  72: {"name":"Mystical Power","id":72,"type":"Psychic","class":"Special","power":70,"acc":90,"pp":10,"effect":"The user strengthens itself with a mysterious power. If it excels in offense, its offensive stats are raised. If it excels in defense, its defensive stats are raised."},
  73: {"name":"Night Slash","id":73,"type":"Dark","class":"Physical","power":70,"acc":100,"pp":15,"effect":"High critical hit ratio."},
  74: {"name":"Poison Jab","id":74,"type":"Poison","class":"Physical","power":80,"acc":100,"pp":20,"effect":"May poison the opponent."},
  75: {"name":"Power Gem","id":75,"type":"Rock","class":"Special","power":80,"acc":100,"pp":20,"effect":"The user attacks with a ray of light that sparkles as if it were made of gemstones."},
  76: {"name":"Psycho Cut","id":76,"type":"Psychic","class":"Physical","power":70,"acc":100,"pp":20,"effect":"High critical hit ratio."},
  77: {"name":"Psyshield Bash","id":77,"type":"Psychic","class":"Physical","power":70,"acc":90,"pp":10,"effect":"Cloaking itself in psychic energy, the user slams into the target. This may also raise the user’s defensive stats."},
  78: {"name":"Rock Slide","id":78,"type":"Rock","class":"Physical","power":75,"acc":90,"pp":10,"effect":"May cause flinching."},
  79: {"name":"Shadow Ball","id":79,"type":"Ghost","class":"Special","power":80,"acc":100,"pp":15,"effect":"May lower opponent's Special Defense."},
  80: {"name":"Shadow Claw","id":80,"type":"Ghost","class":"Physical","power":70,"acc":100,"pp":15,"effect":"High critical hit ratio."},
  81: {"name":"Slash","id":81,"type":"Normal","class":"Physical","power":70,"acc":100,"pp":20,"effect":"High critical hit ratio."},
  82: {"name":"Thunder Punch","id":82,"type":"Electric","class":"Physical","power":75,"acc":100,"pp":15,"effect":"May paralyze opponent."},
  83: {"name":"Tri Attack","id":83,"type":"Normal","class":"Special","power":80,"acc":100,"pp":10,"effect":"May paralyze, burn or freeze opponent."},
  84: {"name":"Wave Crash","id":84,"type":"Water","class":"Physical","power":75,"acc":100,"pp":10,"effect":"The user shrouds itself in water and slams into the target with its whole body to inflict damage. This also damages the user and raises the user’s action speed."},
  85: {"name":"X-Scissor","id":85,"type":"Bug","class":"Physical","power":80,"acc":100,"pp":15,"effect":"The user slashes at the target by crossing its scythes or claws as if they were a pair of scissors. This move has a heightened chance of landing a critical hit."},
  86: {"name":"Zen Headbutt","id":86,"type":"Psychic","class":"Physical","power":80,"acc":90,"pp":15,"effect":"May cause flinching."},
  87: {"name":"Acid Armor","id":87,"type":"Poison","class":"Status","power":null,"acc":null,"pp":20,"effect":"Sharply raises user's Defense."},
  88: {"name":"Aerial Ace","id":88,"type":"Flying","class":"Physical","power":60,"acc":null,"pp":20,"effect":"Ignores Accuracy and Evasiveness."},
  89: {"name":"Air Cutter","id":89,"type":"Flying","class":"Special","power":60,"acc":95,"pp":25,"effect":"High critical hit ratio."},
  90: {"name":"Ancient Power","id":90,"type":"Rock","class":"Special","power":60,"acc":100,"pp":5,"effect":"May raise all user's stats at once."},
  91: {"name":"Baby-Doll Eyes","id":91,"type":"Fairy","class":"Status","power":null,"acc":100,"pp":30,"effect":"Always goes first. Lowers the target's attack."},
  92: {"name":"Barb Barrage","id":92,"type":"Poison","class":"Physical","power":60,"acc":100,"pp":15,"effect":"The user launches countless toxic barbs to inflict damage. This may also poison the target. This move’s power is doubled if the target has a status condition."},
  93: {"name":"Bite","id":93,"type":"Dark","class":"Physical","power":60,"acc":100,"pp":25,"effect":"May cause flinching."},
  94: {"name":"Bitter Malice","id":94,"type":"Ghost","class":"Special","power":60,"acc":100,"pp":15,"effect":"The user attacks its target with spine-chilling resentment. This may also leave the target with frostbite. This move’s power is doubled if the target has a status condition."},
  95: {"name":"Bulk Up","id":95,"type":"Fighting","class":"Status","power":null,"acc":null,"pp":20,"effect":"Raises user's Attack and Defense."},
  96: {"name":"Bulldoze","id":96,"type":"Ground","class":"Physical","power":60,"acc":100,"pp":20,"effect":"Lowers opponent's Speed."},
  97: {"name":"Calm Mind","id":97,"type":"Psychic","class":"Status","power":null,"acc":null,"pp":20,"effect":"Raises user's Special Attack and Special Defense."},
  98: {"name":"Ceaseless Edge","id":98,"type":"Dark","class":"Physical","power":65,"acc":90,"pp":15,"effect":"The user slashes its shell blade at the target, aiming to land a critical hit. Shell splinters left behind by this attack will continue to damage the target for several turns."},
  99: {"name":"Charge Beam","id":99,"type":"Electric","class":"Special","power":50,"acc":90,"pp":10,"effect":"May raise user's Special Attack."},
  100: {"name":"Confusion","id":100,"type":"Psychic","class":"Special","power":50,"acc":100,"pp":25,"effect":"May confuse opponent."},
  101: {"name":"Crush Grip","id":101,"type":"Normal","class":"Physical","power":null,"acc":100,"pp":5,"effect":"More powerful when opponent has higher HP."},
  102: {"name":"Dark Void","id":102,"type":"Dark","class":"Status","power":null,"acc":50,"pp":10,"effect":"Puts all adjacent opponents to sleep."},
  103: {"name":"Dire Claw","id":103,"type":"Poison","class":"Physical","power":60,"acc":100,"pp":15,"effect":"Cloaking itself in psychic energy, the user slams into the target. This may also raise the user’s defensive stats."},
  104: {"name":"Draining Kiss","id":104,"type":"Fairy","class":"Special","power":50,"acc":100,"pp":10,"effect":"User recovers most the HP inflicted on opponent."},
  105: {"name":"Fire Fang","id":105,"type":"Fire","class":"Physical","power":65,"acc":95,"pp":15,"effect":"May cause flinching and/or burn opponent."},
  106: {"name":"Flame Wheel","id":106,"type":"Fire","class":"Physical","power":60,"acc":100,"pp":25,"effect":"May burn opponent."},
  107: {"name":"Focus Energy","id":107,"type":"Normal","class":"Status","power":null,"acc":null,"pp":30,"effect":"Increases critical hit ratio."},
  108: {"name":"Hex","id":108,"type":"Ghost","class":"Special","power":65,"acc":100,"pp":10,"effect":"Inflicts more damage if the target has a status condition."},
  109: {"name":"Hidden Power","id":109,"type":"Normal","class":"Special","power":60,"acc":100,"pp":15,"effect":"Type and power depends on user's IVs."},
  110: {"name":"Hypnosis","id":110,"type":"Psychic","class":"Status","power":null,"acc":70,"pp":20,"effect":"Puts opponent to sleep."},
  111: {"name":"Ice Fang","id":111,"type":"Ice","class":"Physical","power":65,"acc":95,"pp":15,"effect":"May cause flinching and/or freeze opponent."},
  112: {"name":"Icy Wind","id":112,"type":"Ice","class":"Special","power":55,"acc":95,"pp":15,"effect":"Lowers opponent's Speed."},
  113: {"name":"Infernal Parade","id":113,"type":"Ghost","class":"Special","power":60,"acc":100,"pp":15,"effect":"The user attacks with myriad fireballs. This may also leave the target with a burn. This move’s power is doubled if the target has a status condition."},
  114: {"name":"Iron Defense","id":114,"type":"Steel","class":"Status","power":null,"acc":null,"pp":15,"effect":"Sharply raises user's Defense."},
  115: {"name":"Magical Leaf","id":115,"type":"Grass","class":"Special","power":60,"acc":null,"pp":20,"effect":"Ignores Accuracy and Evasiveness."},
  116: {"name":"Mimic","id":116,"type":"Normal","class":"Status","power":null,"acc":null,"pp":10,"effect":"Copies the opponent's last move."},
  117: {"name":"Mud Bomb","id":117,"type":"Ground","class":"Special","power":65,"acc":85,"pp":10,"effect":"May lower opponent's Accuracy."},
  118: {"name":"Nasty Plot","id":118,"type":"Dark","class":"Status","power":null,"acc":null,"pp":20,"effect":"Sharply raises user's Special Attack."},
  119: {"name":"Octazooka","id":119,"type":"Water","class":"Special","power":65,"acc":85,"pp":10,"effect":"May lower opponent's Accuracy."},
  120: {"name":"Ominous Wind","id":120,"type":"Ghost","class":"Special","power":60,"acc":100,"pp":5,"effect":"May raise all user's stats at once."},
  121: {"name":"Poison Gas","id":121,"type":"Poison","class":"Status","power":null,"acc":90,"pp":40,"effect":"Poisons opponent."},
  122: {"name":"Poison Powder","id":122,"type":"Poison","class":"Status","power":null,"acc":75,"pp":35,"effect":"Poisons opponent."},
  123: {"name":"Recover","id":123,"type":"Normal","class":"Status","power":null,"acc":null,"pp":10,"effect":"User recovers half its max HP."},
  124: {"name":"Rest","id":124,"type":"Psychic","class":"Status","power":null,"acc":null,"pp":10,"effect":"User sleeps for 2 turns, but user is fully healed."},
  125: {"name":"Roost","id":125,"type":"Flying","class":"Status","power":null,"acc":null,"pp":10,"effect":"User recovers half of its max HP and loses the Flying type temporarily."},
  126: {"name":"Silver Wind","id":126,"type":"Bug","class":"Special","power":60,"acc":100,"pp":5,"effect":"May raise all stats of user at once."},
  127: {"name":"Sleep Powder","id":127,"type":"Grass","class":"Status","power":null,"acc":75,"pp":15,"effect":"Puts opponent to sleep."},
  128: {"name":"Snarl","id":128,"type":"Dark","class":"Special","power":55,"acc":95,"pp":15,"effect":"Lowers opponent's Special Attack."},
  129: {"name":"Soft-Boiled","id":129,"type":"Normal","class":"Status","power":null,"acc":null,"pp":10,"effect":"User recovers half its max HP."},
  130: {"name":"Spark","id":130,"type":"Electric","class":"Physical","power":65,"acc":100,"pp":20,"effect":"May paralyze opponent."},
  131: {"name":"Spikes","id":131,"type":"Ground","class":"Status","power":null,"acc":null,"pp":20,"effect":"Hurts opponents when they switch into battle."},
  132: {"name":"Splash","id":132,"type":"Normal","class":"Status","power":null,"acc":null,"pp":40,"effect":"Doesn't do ANYTHING."},
  133: {"name":"Spore","id":133,"type":"Grass","class":"Status","power":null,"acc":100,"pp":15,"effect":"Puts opponent to sleep."},
  134: {"name":"Stealth Rock","id":134,"type":"Rock","class":"Status","power":null,"acc":null,"pp":20,"effect":"Damages opponent switching into battle."},
  135: {"name":"Stone Axe","id":135,"type":"Rock","class":"Physical","power":65,"acc":90,"pp":15,"effect":"The user swings its stone axes at the target, aiming to land a critical hit. Stone splinters left behind by this attack continue to damage the target for several turns."},
  136: {"name":"Struggle Bug","id":136,"type":"Bug","class":"Special","power":50,"acc":100,"pp":20,"effect":"Lowers opponent's Special Attack."},
  137: {"name":"Stun Spore","id":137,"type":"Grass","class":"Status","power":null,"acc":75,"pp":30,"effect":"Paralyzes opponent."},
  138: {"name":"Swift","id":138,"type":"Normal","class":"Special","power":60,"acc":null,"pp":20,"effect":"Ignores Accuracy and Evasiveness."},
  139: {"name":"Swords Dance","id":139,"type":"Normal","class":"Status","power":null,"acc":null,"pp":20,"effect":"Sharply raises user's Attack."},
  140: {"name":"Teleport","id":140,"type":"Psychic","class":"Status","power":null,"acc":null,"pp":20,"effect":"Allows user to flee wild battles; also warps player to last PokéCenter."},
  141: {"name":"Thunder Fang","id":141,"type":"Electric","class":"Physical","power":65,"acc":95,"pp":15,"effect":"May cause flinching and/or paralyze opponent."},
  142: {"name":"Thunder Wave","id":142,"type":"Electric","class":"Status","power":null,"acc":90,"pp":20,"effect":"Paralyzes opponent."},
  143: {"name":"Triple Arrows","id":143,"type":"Fighting","class":"Physical","power":50,"acc":100,"pp":15,"effect":"The user delivers an axe kick, then fires three arrows. This raises the chance of its future attacks landing critical hits and also lowers the target’s defensive stats."},
  144: {"name":"Venoshock","id":144,"type":"Poison","class":"Special","power":65,"acc":100,"pp":10,"effect":"Inflicts double damage if the target is poisoned."},
  145: {"name":"Water Pulse","id":145,"type":"Water","class":"Special","power":60,"acc":100,"pp":20,"effect":"May confuse opponent."},
  146: {"name":"Acid Spray","id":146,"type":"Poison","class":"Special","power":40,"acc":100,"pp":20,"effect":"Sharply lowers opponent's Special Defense."},
  147: {"name":"Aqua Jet","id":147,"type":"Water","class":"Physical","power":40,"acc":100,"pp":20,"effect":"User attacks first."},
  148: {"name":"Astonish","id":148,"type":"Ghost","class":"Physical","power":30,"acc":100,"pp":15,"effect":"May cause flinching."},
  149: {"name":"Bubble","id":149,"type":"Water","class":"Special","power":40,"acc":100,"pp":30,"effect":"May lower opponent's Speed."},
  150: {"name":"Bullet Punch","id":150,"type":"Steel","class":"Physical","power":40,"acc":100,"pp":30,"effect":"User attacks first."},
  151: {"name":"Double Hit","id":151,"type":"Normal","class":"Physical","power":35,"acc":90,"pp":10,"effect":"Hits twice in one turn."},
  152: {"name":"Ember","id":152,"type":"Fire","class":"Special","power":40,"acc":100,"pp":25,"effect":"May burn opponent."},
  153: {"name":"Fairy Wind","id":153,"type":"Fairy","class":"Special","power":40,"acc":100,"pp":30,"effect":"The user stirs up a fairy wind and strikes the target with it."},
  154: {"name":"False Swipe","id":154,"type":"Normal","class":"Physical","power":40,"acc":100,"pp":40,"effect":"Always leaves opponent with at least 1 HP."},
  155: {"name":"Gust","id":155,"type":"Flying","class":"Special","power":40,"acc":100,"pp":35,"effect":"Hits Pokémon using Fly/Bounce with double power."},
  156: {"name":"Ice Ball","id":156,"type":"Ice","class":"Physical","power":30,"acc":90,"pp":20,"effect":"Doubles in power each turn for 5 turns."},
  157: {"name":"Ice Shard","id":157,"type":"Ice","class":"Physical","power":40,"acc":100,"pp":30,"effect":"User attacks first."},
  158: {"name":"Leafage","id":158,"type":"Grass","class":"Physical","power":40,"acc":100,"pp":40,"effect":"Strikes opponent with leaves."},
  159: {"name":"Mach Punch","id":159,"type":"Fighting","class":"Physical","power":40,"acc":100,"pp":30,"effect":"User attacks first."},
  160: {"name":"Powder Snow","id":160,"type":"Ice","class":"Special","power":40,"acc":100,"pp":25,"effect":"May freeze opponent."},
  161: {"name":"Quick Attack","id":161,"type":"Normal","class":"Physical","power":40,"acc":100,"pp":30,"effect":"User attacks first."},
  162: {"name":"Rock Smash","id":162,"type":"Fighting","class":"Physical","power":40,"acc":100,"pp":15,"effect":"May lower opponent's Defense."},
  163: {"name":"Rollout","id":163,"type":"Rock","class":"Physical","power":30,"acc":90,"pp":20,"effect":"Doubles in power each turn for 5 turns."},
  164: {"name":"Shadow Sneak","id":164,"type":"Ghost","class":"Physical","power":40,"acc":100,"pp":30,"effect":"User attacks first."},
  165: {"name":"Tackle","id":165,"type":"Normal","class":"Physical","power":40,"acc":100,"pp":35,"effect":"A physical attack in which the user charges and slams into the target with its whole body."},
  166: {"name":"Thunder Shock","id":166,"type":"Electric","class":"Special","power":40,"acc":100,"pp":30,"effect":"May paralyze opponent."},
  167: {"name":"Twister","id":167,"type":"Dragon","class":"Special","power":40,"acc":100,"pp":20,"effect":"May cause flinching. Hits Pokémon using Fly/Bounce with double power."},
  168: {"name":"Absorb","id":168,"type":"Grass","class":"Special","power":20,"acc":100,"pp":25,"effect":"User recovers half the HP inflicted on opponent."},
  169: {"name":"Mud-Slap","id":169,"type":"Ground","class":"Special","power":20,"acc":100,"pp":10,"effect":"Lowers opponent's Accuracy."},
  170: {"name":"Pin Missile","id":170,"type":"Bug","class":"Physical","power":25,"acc":95,"pp":20,"effect":"Hits 2-5 times in one turn."},
  171: {"name":"Poison Sting","id":171,"type":"Poison","class":"Physical","power":15,"acc":100,"pp":35,"effect":"May poison the opponent."},
  172: {"name":"Lunar Blessing","id":172,"type":"Psychic","class":"Status","power":0,"acc":100,"pp":10,"effect":"The user heals its own status conditions and restores its HP. Incoming moves also become more likely to miss."},
  173: {"name":"Power Shift","id":173,"type":"Normal","class":"Status","power":null,"acc":100,"pp":10,"effect":"The user swaps its offensive and defensive stats."},
  174: {"name":"Shelter","id":174,"type":"Steel","class":"Status","power":null,"acc":100,"pp":10,"effect":"The user makes its skin as hard as an iron shield, raising its defensive stats. Incoming moves also become more likely to miss."},
  175: {"name":"Take Heart","id":175,"type":"Psychic","class":"Status","power":0,"acc":100,"pp":10,"effect":"The user lifts its spirits, healing its own status conditions and raising its offensive and defensive stats."},
  176: {"name":"Victory Dance","id":176,"type":"Fighting","class":"Status","power":null,"acc":100,"pp":10,"effect":"The user performs a dance to usher in victory. This raises the user’s offensive and defensive stats and increases the damage dealt by the user’s moves by 50 percent."},
};
