import {
  __commonJS
} from "./chunk-UXIASGQL.js";

// node_modules/cowsayjs/lib/box.js
var require_box = __commonJS({
  "node_modules/cowsayjs/lib/box.js"(exports, module) {
    "use strict";
    var limits = {
      say: [
        "< ",
        " >",
        "/ ",
        " \\",
        "\\ ",
        " /",
        "| ",
        " |"
      ],
      think: [
        "( ",
        " )",
        "( ",
        " )",
        "( ",
        " )",
        "( ",
        " )"
      ]
    };
    function split(message, wrap) {
      if (typeof wrap !== "number" || isNaN(wrap)) {
        return message.split(/\r\n|[\n\r\f\v\u2028\u2029\u0085]/g).map(function(line) {
          var tab = line.indexOf("	");
          if (tab === -1) {
            return line;
          }
          var tabbed = line;
          do {
            var spaces = Array(9 - tab % 8).join(" ");
            tabbed = tabbed.slice(0, tab) + spaces + tabbed.slice(tab + 1);
            tab = tabbed.indexOf("	", tab + spaces.length);
          } while (tab !== -1);
          return tabbed;
        });
      }
      var lines = message.replace(/(?:\r\n|[\n\r\f\v\u2028\u2029\u0085])(\S)/g, " $1").replace(/(?:\r\n|[\n\r\f\v\u2028\u2029\u0085])\s+/g, "\n\n").replace(/(?:\r\n|[\t\n\r\f\v\u2028\u2029\u0085])$/g, " ").split(/\r\n|[\n\r\f\v\u2028\u2029\u0085]/g);
      lines = lines.map(function(line, i) {
        if (/^\s*$/.test(line)) {
          return "";
        }
        var fixed = line.replace(/\s+/g, " ");
        return i > 0 ? fixed.replace(/^\s+/, "") : fixed;
      }).filter(function(line, i, lines2) {
        if (line.length > 0 || i <= 1) {
          return true;
        }
        return lines2[i - 1].length > 0;
      });
      if (lines.every(function(line) {
        return line.length === 0;
      })) {
        return [""];
      }
      if (lines[lines.length - 1].length === 0) {
        lines.pop();
      }
      var initial = [];
      var max = wrap;
      var col = wrap - 1;
      return lines.reduce(function(acc, line, i, src) {
        if (line.length === 0) {
          return acc.concat(line);
        }
        if (max < 2) {
          if (src[i + 1] !== "") {
            src.splice(0);
          }
          max = 2;
          col = 1;
          return acc.concat("0");
        }
        var last = i > 0 ? acc[acc.length - 1] + line : line;
        var space = last.length < max ? last.length : last.lastIndexOf(" ", col);
        var br = space > 0 && space < col ? space : last.length === max && last[last.length - 1] === " " ? max : col;
        var words = acc.concat(last.slice(0, br));
        var rest = line.slice(br).replace(/^\s+/, "");
        while (rest.length > 0) {
          space = rest.length < max ? rest.length : rest.lastIndexOf(" ", col);
          br = space > 0 && space < col ? space : rest.length === max && rest[rest.length - 1] === " " ? max : col;
          words.push(rest.slice(0, br));
          rest = rest.slice(br).replace(/^\s+/, "");
        }
        return words;
      }, initial);
    }
    function pad(str, len) {
      if (str.length >= len) {
        return str;
      }
      var pad2 = Array(len - str.length + 1).join(" ");
      return str + pad2;
    }
    function perform(action, message, wrap) {
      var type = action === "think" ? "think" : "say";
      var text = typeof message === "string" ? message : "";
      var col;
      switch (typeof wrap) {
        case "number":
          col = wrap;
          break;
        case "string":
          col = parseInt(wrap);
          break;
        default:
          switch (wrap) {
            case void 0:
            case true:
              col = 40;
              break;
            default:
              col = void 0;
          }
      }
      var limit = limits[type];
      var lines = split(text, col);
      var width = lines.map(function(line) {
        return line.length;
      }).reduce(function(prev, curr) {
        return curr > prev ? curr : prev;
      }, 0);
      var spanner = Array(width + 3);
      var box = [" " + spanner.join("_")];
      if (lines.length === 1) {
        box.push(limit[0] + pad(lines[0], width) + limit[1]);
      } else {
        var last = lines.length - 1;
        var i = 0;
        do {
          switch (i) {
            case 0:
              box.push(limit[2] + pad(lines[i], width) + limit[3]);
              break;
            case last:
              box.push(limit[4] + pad(lines[i], width) + limit[5]);
              break;
            default:
              box.push(limit[6] + pad(lines[i], width) + limit[7]);
          }
        } while (++i <= last);
      }
      box.push(" " + spanner.join("-"), "");
      return box.join("\n");
    }
    function say(message, wrap) {
      return perform("say", message, wrap);
    }
    function think(message, wrap) {
      return perform("think", message, wrap);
    }
    module.exports = {
      perform,
      say,
      think
    };
  }
});

// node_modules/cowsayjs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/cowsayjs/lib/utils.js"(exports, module) {
    "use strict";
    function find(arr, predicate) {
      for (var i = 0; i < arr.length; ++i) {
        var elem = arr[i];
        if (predicate(elem, i, arr)) {
          return elem;
        }
      }
      return void 0;
    }
    module.exports = {
      find
    };
  }
});

// node_modules/cowsayjs/lib/mode.js
var require_mode = __commonJS({
  "node_modules/cowsayjs/lib/mode.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var modes = [
      { id: "u", name: "default" },
      { id: "b", name: "borg", eyes: "==" },
      { id: "d", name: "dead", eyes: "xx", tongue: "U " },
      { id: "g", name: "greedy", eyes: "$$" },
      { id: "p", name: "paranoia", eyes: "@@" },
      { id: "s", name: "stoned", eyes: "**", tongue: "U " },
      { id: "t", name: "tired", eyes: "--" },
      { id: "w", name: "wired", eyes: "OO" },
      { id: "y", name: "youthful", eyes: ".." }
    ];
    var customModes = [];
    function copyModeData(modeData) {
      return {
        id: modeData.id,
        name: modeData.name,
        eyes: modeData.eyes,
        tongue: modeData.tongue
      };
    }
    function faceMode(face) {
      var mode;
      if (typeof face === "object" && face !== null) {
        mode = utils.find(modes.concat(customModes), function(mode2) {
          return mode2.eyes === face.eyes && mode2.tongue === face.tongue;
        });
      }
      if (mode === void 0) {
        mode = modes[0];
      }
      return {
        id: mode.id,
        name: mode.name
      };
    }
    function modeFace(id) {
      var face;
      if (typeof id === "string") {
        face = utils.find(modes.concat(customModes), function(mode) {
          return mode.id === id || mode.name === id;
        });
      }
      if (face === void 0) {
        face = modes[0];
      }
      return {
        eyes: face.eyes,
        tongue: face.tongue
      };
    }
    function addMode(modeData) {
      var valid = true;
      valid = valid && typeof modeData === "object" && modeData !== null && !Array.isArray(modeData);
      valid = valid && typeof modeData.id === "string" && modeData.id.length === 1;
      valid = valid && typeof modeData.name === "string" && modeData.id === modeData.name[0];
      valid = valid && (typeof modeData.eyes === "undefined" || typeof modeData.eyes === "string");
      valid = valid && (typeof modeData.tongue === "undefined" || typeof modeData.tongue === "string");
      if (!valid) {
        return false;
      }
      var ind = modes.concat(customModes).findIndex(function(mode) {
        return mode.id === modeData.id;
      });
      if (ind !== -1) {
        return false;
      }
      var options = ["h", "e", "f", "l", "n", "r", "T", "W"];
      if (options.includes(modeData.id)) {
        return false;
      }
      customModes.push(copyModeData(modeData));
      customModes.sort(function(a, b) {
        return a.id.localeCompare(b.id);
      });
      return true;
    }
    function removeMode(id) {
      if (typeof id !== "string") {
        return void 0;
      }
      var ind = customModes.findIndex(function(face) {
        return face.id === id || face.name === id;
      });
      if (ind !== -1) {
        return customModes.splice(ind, 1)[0];
      }
      return void 0;
    }
    module.exports = {
      modes: modes.map(copyModeData),
      customModes,
      faceMode,
      modeFace,
      addMode,
      removeMode
    };
  }
});

// node_modules/cowsayjs/cows/default.cow.js
var require_default_cow = __commonJS({
  "node_modules/cowsayjs/cows/default.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "default",
      template: [
        "        \\   ^__^",
        "         \\  (oo)\\_______",
        "            (__)\\       )\\/\\",
        "                ||----w |",
        "                ||     ||"
      ],
      actionPos: [
        [0, 8],
        [1, 9]
      ],
      eyesPos: [
        [1, 13],
        [1, 14]
      ],
      tonguePos: [
        [3, 13],
        [3, 14]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/apt.cow.js
var require_apt_cow = __commonJS({
  "node_modules/cowsayjs/cows/apt.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "apt",
      template: [
        "       \\ (__)",
        "         (oo)",
        "   /------\\/",
        "  / |    ||",
        " *  /\\---/\\",
        "    ~~   ~~"
      ],
      actionPos: [
        [0, 7]
      ],
      eyesPos: [
        [1, 10],
        [1, 11]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/beavis.zen.cow.js
var require_beavis_zen_cow = __commonJS({
  "node_modules/cowsayjs/cows/beavis.zen.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "beavis.zen",
      template: [
        "   \\        __------~~-,",
        "    \\     ,'            ,",
        "          /               \\",
        "         /                :",
        "        |                  '",
        "        |                  |",
        "        |                  |",
        "         |   _--           |",
        "         _| =-.     .-.   ||",
        "         o|/o/       _.   |",
        "         /  ~          \\ |",
        "       (____@)  ___~    |",
        "          |_===~~~.`    |",
        "       _______.--~     |",
        "       \\________       |",
        "                \\      |",
        "              __/-___-- -__",
        "             /            _ \\"
      ],
      actionPos: [
        [0, 3],
        [1, 4]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/blowfish.cow.js
var require_blowfish_cow = __commonJS({
  "node_modules/cowsayjs/cows/blowfish.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "blowfish",
      template: [
        "   \\",
        "    \\",
        "               |    .",
        "           .   |L  /|",
        "       _ . |\\ _| \\--+._/| .",
        "      / ||\\| Y J  )   / |/| ./",
        "     J  |)'( |        ` F`.'/",
        "   -<|  F         __     .-<",
        "     | /       .-'. `.  /-. L___",
        "     J \\      <    \\  | | O\\|.-'",
        "   _J \\  .-    \\/ O | | \\  |F",
        "  '-F  -<_.     \\   .-'  `-' L__",
        " __J  _   _.     >-'  )._.   |-'",
        " `-|.'   /_.           \\_|   F",
        "   /.-   .                _.<",
        "  /'    /.'             .'  `\\",
        "   /L  /'   |/      _.-'-\\",
        "  /'J       ___.---'\\|",
        "    |\\  .--' V  | `. `",
        "    |/`. `-.     `._)",
        "       / .-.\\",
        " VK    \\ (  `\\",
        "        `.\\",
        ""
      ],
      actionPos: [
        [0, 3],
        [1, 4]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/bong.cow.js
var require_bong_cow = __commonJS({
  "node_modules/cowsayjs/cows/bong.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "bong",
      template: [
        "         \\",
        "          \\",
        "            ^__^ ",
        "    _______/(oo)",
        "/\\/(       /(__)",
        "   | W----|| |~|",
        "   ||     || |~|  ~~",
        "             |~|  ~",
        "             |_| o",
        "             |#|/",
        "            _+#+_"
      ],
      actionPos: [
        [0, 9],
        [1, 10]
      ],
      eyesPos: [
        [3, 13],
        [3, 14]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/bud-frogs.cow.js
var require_bud_frogs_cow = __commonJS({
  "node_modules/cowsayjs/cows/bud-frogs.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "bud-frogs",
      template: [
        "     \\",
        "      \\",
        "          oO)-.                       .-(Oo",
        "         /__  _\\                     /_  __\\",
        "         \\  \\(  |     ()~()         |  )/  /",
        "          \\__|\\ |    (-___-)        | /|__/",
        "          '  '--'    ==`-'==        '--'  '"
      ],
      actionPos: [
        [0, 5],
        [1, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/bunny.cow.js
var require_bunny_cow = __commonJS({
  "node_modules/cowsayjs/cows/bunny.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "bunny",
      template: [
        "  \\",
        "   \\   \\",
        "        \\ /\\",
        "        ( )",
        "      .( o )."
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/calvin.cow.js
var require_calvin_cow = __commonJS({
  "node_modules/cowsayjs/cows/calvin.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "calvin",
      template: [
        " \\                   .,",
        "   \\         .      .TR   d'",
        "     \\      k,l    .R.b  .t .Je",
        "       \\   .P q.   a|.b .f .Z%",
        "           .b .h  .E` # J: 2`     .",
        "      .,.a .E  ,L.M'  ?:b `| ..J9!`.,",
        '       q,.h.M`   `..,   ..,""` ..2"`',
        "       .M, J8`   `:       `   3;",
        '   .    Jk              ...,   `^7"90c.',
        "    j,  ,!     .7\"'`j,.|   .n.   ...",
        "   j, 7'     .r`     4:      L   `...",
        "  ..,m.      J`    ..,|..    J`  7TWi",
        "  ..JJ,.:    %    oo      ,. ....,",
        "    .,E      3     7`g.M:    P  41",
        '   JT7"\'      O.   .J,;     ``  V"7N.',
        '   G.           ""Q+  .Zu.,!`      Z`',
        "   .9.. .         J&..J!       .  ,:",
        '      7"9a                    JM"!',
        "         .5J.     ..        ..F`",
        "            78a..   `    ..2'",
        `                J9Ksaw0"'`,
        "               .EJ?A...a.",
        "               q...g...gi",
        "              .m...qa..,y:",
        "              .HQFNB&...mm",
        "               ,Z|,m.a.,dp",
        '            .,?f` ,E?:"^7b',
        "            `A| . .F^^7'^4,",
        "             1.MMMMMMMMMMMQzna,",
        '         ...f"A.JdT     J:    Jp,',
        "          `JNa..........A....af`",
        "               `^^^^^'`"
      ],
      actionPos: [
        [0, 1],
        [1, 3],
        [2, 5],
        [3, 7]
      ],
      eyesPos: [
        [12, 18],
        [12, 19]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/cheese.cow.js
var require_cheese_cow = __commonJS({
  "node_modules/cowsayjs/cows/cheese.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "cheese",
      template: [
        "   \\",
        "    \\",
        "      _____   _________",
        "     /     \\_/         |",
        "    |                 ||",
        "    |                 ||",
        "   |    ###\\  /###   | |",
        "   |     0  \\/  0    | |",
        "  /|                 | |",
        " / |        <        |\\ \\",
        "| /|                 | | |",
        "| |     \\_______/   |  | |",
        "| |                 | / /",
        "/||                 /|||",
        "   ----------------|",
        "        | |    | |",
        "        ***    ***",
        "       /___\\  /___\\"
      ],
      actionPos: [
        [0, 3],
        [1, 4]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/cock.cow.js
var require_cock_cow = __commonJS({
  "node_modules/cowsayjs/cows/cock.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "cock",
      template: [
        "    \\",
        "     \\  /\\/\\",
        "       \\   /",
        "       |  0 >>",
        "       |___|",
        " __((_<|   |",
        "(          |",
        "(__________)",
        "   |      |",
        "   |      |",
        "   /\\     /\\"
      ],
      actionPos: [
        [0, 4],
        [1, 5]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/cower.cow.js
var require_cower_cow = __commonJS({
  "node_modules/cowsayjs/cows/cower.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "cower",
      template: [
        "     \\",
        "      \\",
        "        ,__, |    | ",
        "        (oo)\\|    |___",
        "        (__)\\|    |   )\\_",
        "             |    |_w |  \\",
        "             |    |  ||   *\n",
        "             Cower...."
      ],
      actionPos: [
        [0, 5],
        [1, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/daemon.cow.js
var require_daemon_cow = __commonJS({
  "node_modules/cowsayjs/cows/daemon.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "daemon",
      template: [
        "   \\         ,        ,",
        "    \\       /(        )`",
        "     \\      \\ \\___   / |",
        "            /- _  `-/  '",
        "           (/\\/ \\ \\   /\\",
        "           / /   | `    \\",
        "           O O   ) /    |",
        "           `-^--'`<     '",
        "          (_.)  _  )   /",
        "           `.___/`    /",
        "             `-----' /",
        "<----.     __ / __   \\",
        "<----|====O)))==) \\) /====",
        "<----'    `--' `.__,' \\",
        "             |        |",
        "              \\       /",
        "        ______( (_  / \\______",
        "      ,'  ,-----'   |        \\",
        "      `--{__________)        \\/"
      ],
      actionPos: [
        [0, 3],
        [1, 4],
        [2, 5]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/dragon-and-cow.cow.js
var require_dragon_and_cow_cow = __commonJS({
  "node_modules/cowsayjs/cows/dragon-and-cow.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "dragon-and-cow",
      template: [
        "                       \\                    ^    /^",
        "                        \\                  / \\  // \\",
        "                         \\   |\\___/|      /   \\//  .\\",
        "                          \\  /O  O  \\__  /    //  | \\ \\           *----*",
        "                            /     /  \\/_/    //   |  \\  \\          \\   |",
        "                            @___@`    \\/_   //    |   \\   \\         \\/\\ \\",
        "                           0/0/|       \\/_ //     |    \\    \\         \\  \\",
        "                       0/0/0/0/|        \\///      |     \\     \\       |  |",
        "                    0/0/0/0/0/_|_ /   (  //       |      \\     _\\     |  /",
        "                 0/0/0/0/0/0/`/,_ _ _/  ) ; -.    |    _ _\\.-~       /   /",
        "                             ,-}        _      *-.|.-~-.           .~    ~",
        "            \\     \\__/        `/\\      /                 ~-. _ .-~      /",
        "             \\____(oo)           *.   }            {                   /",
        "             (    (--)          .----~-.\\        \\-`                 .~",
        "             //__\\\\  \\__ Ack!   ///.----..<        \\             _ -~",
        "            //    \\\\               ///-._ _ _ _ _ _ _{^ - - - - ~"
      ],
      actionPos: [
        [0, 23],
        [1, 24],
        [2, 25],
        [3, 26]
      ],
      eyesPos: [
        [12, 19],
        [12, 20]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/dragon.cow.js
var require_dragon_cow = __commonJS({
  "node_modules/cowsayjs/cows/dragon.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "dragon",
      template: [
        "      \\                    / \\  //\\",
        "       \\    |\\___/|      /   \\//  \\\\",
        "            /0  0  \\__  /    //  | \\ \\    ",
        "           /     /  \\/_/    //   |  \\  \\  ",
        "           @_^_@'/   \\/_   //    |   \\   \\ ",
        "           //_^_/     \\/_ //     |    \\    \\",
        "        ( //) |        \\///      |     \\     \\",
        "      ( / /) _|_ /   )  //       |      \\     _\\",
        "    ( // /) '/,_ _ _/  ( ; -.    |    _ _\\.-~        .-~~~^-.",
        "  (( / / )) ,-{        _      `-.|.-~-.           .~         `.",
        " (( // / ))  '/\\      /                 ~-. _ .-~      .-~^-.  \\",
        " (( /// ))      `.   {            }                   /      \\  \\",
        "  (( / ))     .----~-.\\        \\-'                 .~         \\  `. \\^-.",
        "             ///.----..>        \\             _ -~             `.  ^-`  ^-_",
        "               ///-._ _ _ _ _ _ _}^ - - - - ~                     ~-- ,.-~",
        "                                                                  /.-~"
      ],
      actionPos: [
        [0, 6],
        [1, 7]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/duck.cow.js
var require_duck_cow = __commonJS({
  "node_modules/cowsayjs/cows/duck.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "duck",
      template: [
        " \\",
        "  \\",
        "   \\ >()_",
        "      (__)__ _"
      ],
      actionPos: [
        [0, 1],
        [1, 2],
        [2, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/elephant-in-snake.cow.js
var require_elephant_in_snake_cow = __commonJS({
  "node_modules/cowsayjs/cows/elephant-in-snake.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "elephant-in-snake",
      template: [
        "       \\",
        "        \\  ....",
        "          .    ........",
        "          .            .",
        "          .             .",
        "    .......              .........",
        "    ..............................",
        "Elephant inside ASCII snake"
      ],
      actionPos: [
        [0, 7],
        [1, 8]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/elephant.cow.js
var require_elephant_cow = __commonJS({
  "node_modules/cowsayjs/cows/elephant.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "elephant",
      template: [
        " \\     /\\  ___  /\\",
        "  \\   // \\/   \\/ \\\\",
        "     ((    O O    ))",
        "      \\\\ /     \\ //",
        "       \\/  | |  \\/ ",
        "        |  | |  |",
        "        |  | |  |",
        "        |   o   |",
        "        | |   | |",
        "        |m|   |m|"
      ],
      actionPos: [
        [0, 1],
        [1, 2]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/eyes.cow.js
var require_eyes_cow = __commonJS({
  "node_modules/cowsayjs/cows/eyes.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "eyes",
      template: [
        "    \\",
        "     \\",
        "                                   .::!!!!!!!:.",
        "  .!!!!!:.                        .:!!!!!!!!!!!!",
        "  ~~~~!!!!!!.                 .:!!!!!!!!!UWWW$$$",
        "      :$$NWX!!:           .:!!!!!!XUWW$$$$$$$$$P",
        '      $$$$$##WX!:      .<!!!!UW$$$$"  $$$$$$$$#',
        "      $$$$$  $$$UX   :!!UW$$$$$$$$$   4$$$$$*",
        '      ^$$$B  $$$$\\     $$$$$$$$$$$$   d$$R"',
        `        "*$bd$$$$      '*$$$$$$$$$$$o+#"`,
        '             """"          """""""'
      ],
      actionPos: [
        [0, 4],
        [1, 5]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/flaming-sheep.cow.js
var require_flaming_sheep_cow = __commonJS({
  "node_modules/cowsayjs/cows/flaming-sheep.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "flaming-sheep",
      template: [
        "  \\            .    .     .   ",
        "   \\      .  . .     `  ,     ",
        "    \\    .; .  : .' :  :  : . ",
        "     \\   i..`: i` i.i.,i  i . ",
        "      \\   `,--.|i |i|ii|ii|i: ",
        "           UooU\\.'@@@@@@`.||' ",
        "           \\__/(@@@@@@@@@@)'  ",
        "                (@@@@@@@@)    ",
        "                `YY~~~~YY'    ",
        "                 ||    ||     "
      ],
      actionPos: [
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 5],
        [4, 6]
      ],
      eyesPos: [
        [5, 12],
        [5, 13]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/fox.cow.js
var require_fox_cow = __commonJS({
  "node_modules/cowsayjs/cows/fox.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "fox",
      template: [
        "         \\     ,-.      .-,",
        "          \\    |-.\\ __ /.-|",
        "           \\   \\  `    `  /",
        "                /_     _ \\",
        "              <  _`q  p _  >",
        "              <.._=/  \\=_. >",
        "                 {`\\()/`}`\\",
        "                 {      }  \\",
        "                 |{    }    \\",
        "                 \\ '--'   .- \\",
        "                 |-      /    \\",
        "                 | | | | |     ;",
        "                 | | |.;.,..__ |",
        '               .-"";`         `|',
        "              /    |           /",
        "              `-../____,..---'`"
      ],
      actionPos: [
        [0, 9],
        [1, 10],
        [2, 11]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/ghostbusters.cow.js
var require_ghostbusters_cow = __commonJS({
  "node_modules/cowsayjs/cows/ghostbusters.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "ghostbusters",
      template: [
        "          \\",
        "           \\",
        "            \\          __---__",
        "                    _-       /--______",
        "               __--( /     \\ )XXXXXXXXXXX\\v.",
        "             .-XXX(   O   O  )XXXXXXXXXXXXXXX-",
        "            /XXX(       U     )        XXXXXXX\\",
        "          /XXXXX(              )--_  XXXXXXXXXXX\\",
        "         /XXXXX/ (      O     )   XXXXXX   \\XXXXX\\",
        "         XXXXX/   /            XXXXXX   \\__ \\XXXXX",
        "         XXXXXX__/          XXXXXX         \\__---->",
        " ---___  XXX__/          XXXXXX      \\__         /",
        "   \\-  --__/   ___/\\  XXXXXX            /  ___--/=",
        "    \\-\\    ___/    XXXXXX              '--- XXXXXX",
        "       \\-\\/XXX\\ XXXXXX                      /XXXXX",
        "         \\XXXXXXXXX   \\                    /XXXXX/",
        "          \\XXXXXX      >                 _/XXXXX/",
        "            \\XXXXX--__/              __-- XXXX/",
        "             -XXXXXXXX---------------  XXXXXX-",
        "                \\XXXXXXXXXXXXXXXXXXXXXXXXXX/",
        '                  ""VXXXXXXXXXXXXXXXXXXV""'
      ],
      actionPos: [
        [0, 10],
        [1, 11],
        [2, 12]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/gnu.cow.js
var require_gnu_cow = __commonJS({
  "node_modules/cowsayjs/cows/gnu.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "gnu",
      template: [
        "    \\               ,-----._",
        "  .  \\         .  ,'        `-.__,------._",
        " //   \\      __\\\\'                        `-.",
        "((    _____-'___))                           |",
        " `:='/     (alf_/                            |",
        " `.=|      |='                               |",
        "    |)   O |                                  \\",
        "    |      |                               /\\  \\",
        "    |     /                          .    /  \\  \\",
        "    |    .-..__            ___   .--' \\  |\\   \\  |",
        "   |o o  |     ``--.___.  /   `-'      \\  \\\\   \\ |",
        "    `--''        '  .' / /             |  | |   | \\",
        "                 |  | / /              |  | |   mmm",
        "                 |  ||  |              | /| |",
        "                 ( .' \\ \\              || | |",
        "                 | |   \\ \\            // / /",
        "                 | |    \\ \\          || |_|",
        "                /  |    |_/         /_|",
        "               /__/"
      ],
      actionPos: [
        [0, 4],
        [1, 5],
        [2, 6]
      ],
      tonguePos: [
        [12, 5],
        [12, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/head-in.cow.js
var require_head_in_cow = __commonJS({
  "node_modules/cowsayjs/cows/head-in.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "head-in",
      template: [
        "    \\",
        "     \\",
        "    ^__^         /",
        "    (oo)\\_______/  _________",
        "    (__)\\       )=(  ____|_ \\_____",
        "        ||----w |  \\ \\     \\_____ |",
        "        ||     ||   ||           ||"
      ],
      actionPos: [
        [0, 4],
        [1, 5]
      ],
      eyesPos: [
        [3, 5],
        [3, 6]
      ],
      tonguePos: [
        [5, 5],
        [5, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/hellokitty.cow.js
var require_hellokitty_cow = __commonJS({
  "node_modules/cowsayjs/cows/hellokitty.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "hellokitty",
      template: [
        "  \\",
        "   \\",
        "      /\\_)o<",
        "     |      \\",
        "     | O . O|",
        "      \\_____/"
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/kangaroo.cow.js
var require_kangaroo_cow = __commonJS({
  "node_modules/cowsayjs/cows/kangaroo.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "kangaroo",
      template: [
        "  \\       .",
        "   \\      l\\ /\\",
        "    \\     !)Y.))",
        "         _\\| //",
        "       ,/oo  \\",
        "    .-+    _ /",
        "   `-_--=-'/",
        "         / /",
        "        /  \\_",
        "       Y  .  )",
        ` .--v--^--' /"\\`,
        ` \\/~\\/~T"--' _ \\`,
        '       !  ./~ " \\',
        "       `\\.Y      Y    _",
        "       (~~|      |   |^Y",
        "       `\\. \\     |   l |",
        "         T~\\^. Y |   / |",
        "         | |\\| | !  l  |",
        "         ! | Y | `\\/'. |",
        '   ______L_j l j   ~"  l',
        ' _/,_/, __ ~"__ }____,/',
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~"
      ],
      actionPos: [
        [0, 2],
        [1, 3],
        [2, 4]
      ],
      eyesPos: [
        [4, 9],
        [4, 10]
      ],
      tonguePos: [
        [7, 5],
        [7, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/kiss.cow.js
var require_kiss_cow = __commonJS({
  "node_modules/cowsayjs/cows/kiss.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "kiss",
      template: [
        "     \\",
        "      \\",
        "             ,;;;;;;;,",
        "            ;;;;;;;;;;;,",
        "           ;;;;;'_____;'",
        "           ;;;(/))))|((\\",
        "           _;;((((((|))))",
        "          / |_\\\\\\\\\\\\\\\\\\\\\\\\",
        "     .--~(  \\ ~))))))))))))",
        "    /     \\  `\\-(((((((((((\\\\",
        "    |    | `\\   ) |\\       /|)",
        "     |    |  `. _/  \\_____/ |",
        "      |    , `\\~            /",
        "       |    \\  \\           /",
        "      | `.   `\\|          /",
        "      |   ~-   `\\        /",
        "       \\____~._/~ -_,   (\\",
        "        |-----|\\   \\    ';;",
        "       |      | :;;;'     \\",
        "      |  /    |            |",
        "      |       |            |"
      ],
      actionPos: [
        [0, 5],
        [1, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/kitty.cow.js
var require_kitty_cow = __commonJS({
  "node_modules/cowsayjs/cows/kitty.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "kitty",
      template: [
        "     \\",
        "      \\",
        `       ("\`-'  '-/") .___..--' ' "\`-._`,
        "         ` *_ *  )    `-.   (      ) .`-.__. `)",
        "         (_Y_.) ' ._   )   `._` ;  `` -. .-'",
        "      _.. `--'_..-_/   /--' _ .' ,4",
        "   ( i l ),-''  ( l i),'  ( ( ! .-'    "
      ],
      actionPos: [
        [0, 5],
        [1, 5]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/koala.cow.js
var require_koala_cow = __commonJS({
  "node_modules/cowsayjs/cows/koala.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "koala",
      template: [
        "  \\",
        "   \\",
        "       ___  ",
        "     {~._.~}",
        "      ( Y )",
        "     ()~*~()   ",
        "     (_)-(_)   "
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/kosh.cow.js
var require_kosh_cow = __commonJS({
  "node_modules/cowsayjs/cows/kosh.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "kosh",
      template: [
        "    \\",
        "     \\",
        "      \\",
        "  ___       _____     ___",
        " /   \\     /    /|   /   \\",
        "|     |   /    / |  |     |",
        "|     |  /____/  |  |     |     ",
        "|     |  |    |  |  |     |",
        "|     |  | {} | /   |     |",
        "|     |  |____|/    |     |",
        "|     |    |==|     |     |",
        "|      \\___________/      |",
        "|                         |",
        "|                         |"
      ],
      actionPos: [
        [0, 4],
        [1, 5],
        [2, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/luke-koala.cow.js
var require_luke_koala_cow = __commonJS({
  "node_modules/cowsayjs/cows/luke-koala.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "luke-koala",
      template: [
        "  \\",
        "   \\          .",
        "       ___   //",
        "     {~._.~}// ",
        "      ( Y )K/  ",
        "     ()~*~()   ",
        "     (_)-(_)   ",
        "     Luke    ",
        "     Skywalker",
        "     koala   "
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/mech-and-cow.cow.js
var require_mech_and_cow_cow = __commonJS({
  "node_modules/cowsayjs/cows/mech-and-cow.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "mech-and-cow",
      template: [
        "                                   ,-----.",
        "                                   |     |",
        "                                ,--|     |-.",
        "                         __,----|  |     | |",
        "                       ,;::     |  `_____' |",
        "                       `._______|    i^i   |",
        "                                `----| |---'| .",
        "                           ,-------._| |== ||//",
        "                           |       |_|P`.  /'/",
        "                           `-------' 'Y Y/'/'",
        "                                     .== /_",
        "   ^__^                             /   /'|  `i",
        "   (oo)_______                   /'   /  |   |",
        "   (__)       )/             /'    /   |   `i",
        "       ||----w |           ___,;`----'.___L_,-'`__",
        '       ||     ||          i_____;----.____i""____',
        ""
      ]
    };
  }
});

// node_modules/cowsayjs/cows/meow.cow.js
var require_meow_cow = __commonJS({
  "node_modules/cowsayjs/cows/meow.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "meow",
      template: [
        "  \\",
        "   \\ ,   _ ___.--'''`--''//-,-_--_.",
        "      \\`\"' ` || \\\\ \\ \\\\/ / // / ,-\\\\`,_",
        "     /'`  \\ \\ || Y  | \\|/ / // / - |__ `-,",
        '    /@"\\  ` \\ `\\ |  | ||/ // | \\/  \\  `-._`-,_.,',
        "   /  _.-. `.-\\,___/\\ _/|_/_\\_\\/|_/ |     `-._._)",
        "   `-'``/  /  |  // \\__/\\__  /  \\__/ \\",
        "        `-'  /-\\/  | -|   \\__ \\   |-' |",
        "          __/\\ / _/ \\/ __,-'   ) ,' _|'",
        "         (((__/(((_.' ((___..-'((__,'"
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/milk.cow.js
var require_milk_cow = __commonJS({
  "node_modules/cowsayjs/cows/milk.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "milk",
      template: [
        " \\     ____________ ",
        "  \\    |__________|",
        "      /           /\\",
        "     /           /  \\",
        "    /___________/___/|",
        "    |          |     |",
        "    |  ==\\ /== |     |",
        "    |   O   O  | \\ \\ |",
        "    |     <    |  \\ \\|",
        "   /|          |   \\ \\",
        "  / |  \\_____/ |   / /",
        " / /|          |  / /|",
        "/||\\|          | /||\\/",
        "    -------------|   ",
        "        | |    | | ",
        "       <__/    \\__>"
      ],
      actionPos: [
        [0, 1],
        [1, 2]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/moofasa.cow.js
var require_moofasa_cow = __commonJS({
  "node_modules/cowsayjs/cows/moofasa.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "moofasa",
      template: [
        "       \\    ____",
        "        \\  /    \\",
        "          | ^__^ |",
        "          | (oo) |______",
        "          | (__) |      )\\/\\",
        "           \\____/|----w |",
        "                ||     ||",
        "",
        "                 Moofasa"
      ],
      actionPos: [
        [0, 7],
        [1, 8]
      ],
      eyesPos: [
        [3, 13],
        [3, 14]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/moose.cow.js
var require_moose_cow = __commonJS({
  "node_modules/cowsayjs/cows/moose.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "moose",
      template: [
        "  \\",
        "   \\   \\_\\_    _/_/",
        "    \\      \\__/",
        "           (oo)\\_______",
        "           (__)\\       )\\/\\",
        "               ||----w |",
        "               ||     ||"
      ],
      actionPos: [
        [0, 2],
        [1, 3],
        [2, 4]
      ],
      eyesPos: [
        [3, 12],
        [3, 13]
      ],
      tonguePos: [
        [5, 12],
        [5, 13]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/mutilated.cow.js
var require_mutilated_cow = __commonJS({
  "node_modules/cowsayjs/cows/mutilated.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "mutilated",
      template: [
        "       \\   \\_______",
        " v__v   \\  \\   O   )",
        " (oo)      ||----w |",
        " (__)      ||     ||  \\/\\",
        "    "
      ],
      actionPos: [
        [0, 7],
        [1, 8]
      ],
      eyesPos: [
        [2, 2],
        [2, 3]
      ],
      tonguePos: [
        [4, 2],
        [4, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/pony-smaller.cow.js
var require_pony_smaller_cow = __commonJS({
  "node_modules/cowsayjs/cows/pony-smaller.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "pony-smaller",
      template: [
        "     \\      _^^",
        "      \\   _- oo\\",
        "          \\----- \\______",
        "                \\       )\\",
        "                ||-----|| \\",
        "                ||     ||"
      ],
      actionPos: [
        [0, 5],
        [1, 6]
      ],
      eyesPos: [
        [1, 13],
        [1, 14]
      ],
      tonguePos: [
        [3, 11],
        [3, 12]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/pony.cow.js
var require_pony_cow = __commonJS({
  "node_modules/cowsayjs/cows/pony.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "pony",
      template: [
        "       \\          /\\/\\",
        "        \\         \\/\\/",
        "         \\        /   -\\",
        "          \\     /  oo   -\\",
        "           \\  /           \\",
        "             |    ---\\    -\\",
        "             \\--/     \\     \\",
        "                       |      -\\",
        "                        \\       -\\         -------------\\    /-\\",
        "                         \\        \\-------/              ---/    \\",
        "                          \\                                  |\\   \\",
        "                           |                                 / |  |",
        "                           \\                                |  \\  |",
        "                            |                              /    \\ |",
        "                            |                             /     \\ |",
        "                             \\                             \\     \\|",
        "                              -              /--------\\    |      o",
        "                               \\+   +---------          \\   |",
        "                                |   |                   |   \\",
        "                                |   |                    \\   |",
        "                                |   |                    |   \\",
        "                                |   |                     \\   |",
        "                                 \\  |                     |   |",
        "                                 |  |                      \\  \\",
        "                                 |  |                      |   |",
        "                                 +--+                       ---+"
      ],
      actionPos: [
        [0, 7],
        [1, 8],
        [2, 9],
        [3, 10],
        [4, 11]
      ],
      eyesPos: [
        [3, 19],
        [3, 20]
      ],
      tonguePos: [
        [7, 14],
        [7, 15]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/ren.cow.js
var require_ren_cow = __commonJS({
  "node_modules/cowsayjs/cows/ren.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "ren",
      template: [
        "   \\",
        "    \\",
        "    ____  ",
        "   /# /_\\_",
        "  |  |/o\\o\\",
        "  |  \\\\_/_/",
        " / |_   |  ",
        "|  ||\\_ ~| ",
        "|  ||| \\/  ",
        "|  |||_    ",
        " \\//  |    ",
        "  ||  |    ",
        "  ||_  \\   ",
        "  \\_|  o|  ",
        "  /\\___/   ",
        " /  ||||__ ",
        "    (___)_)"
      ],
      actionPos: [
        [0, 3],
        [1, 4]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/satanic.cow.js
var require_satanic_cow = __commonJS({
  "node_modules/cowsayjs/cows/satanic.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "satanic",
      template: [
        "     \\",
        "      \\  (__)  ",
        "         (\\/)  ",
        "  /-------\\/    ",
        " / | 666 ||    ",
        "*  ||----||      ",
        "   ~~    ~~      "
      ],
      actionPos: [
        [0, 5],
        [1, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/sheep.cow.js
var require_sheep_cow = __commonJS({
  "node_modules/cowsayjs/cows/sheep.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "sheep",
      template: [
        "  \\",
        "   \\",
        "       __     ",
        "      UooU\\.'@@@@@@`.",
        "      \\__/(@@@@@@@@@@)",
        "           (@@@@@@@@)",
        "           `YY~~~~YY'",
        "            ||    ||"
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ],
      eyesPos: [
        [3, 7],
        [3, 8]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/skeleton.cow.js
var require_skeleton_cow = __commonJS({
  "node_modules/cowsayjs/cows/skeleton.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "skeleton",
      template: [
        "          \\      (__)      ",
        "           \\     /oo|  ",
        '            \\   (_"_)*+++++++++*',
        "                   //I#\\\\\\\\\\\\\\\\I\\",
        "                   I[I|I|||||I I `",
        "                   I`I'///'' I I",
        "                   I I       I I",
        "                   ~ ~       ~ ~",
        "                     Scowleton"
      ],
      actionPos: [
        [0, 10],
        [1, 11],
        [2, 12]
      ],
      eyesPos: [
        [1, 18],
        [1, 19]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/small.cow.js
var require_small_cow = __commonJS({
  "node_modules/cowsayjs/cows/small.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "small",
      eyes: "..",
      template: [
        "       \\   ,__,",
        "        \\  (..)____",
        "           (__)    )\\",
        "              ||--|| *"
      ],
      defEyes: "..",
      actionPos: [
        [0, 7],
        [1, 8]
      ],
      eyesPos: [
        [1, 12],
        [1, 13]
      ],
      tonguePos: [
        [3, 12],
        [3, 13]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/snowman.cow.js
var require_snowman_cow = __commonJS({
  "node_modules/cowsayjs/cows/snowman.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "snowman",
      template: [
        "   \\",
        " ___###",
        "   /oo\\ |||",
        "   \\  / \\|/",
        '   /""\\  I',
        "()|    |(I)",
        "   \\  /  I",
        '  /""""\\ I',
        " |      |I",
        " |      |I",
        "  \\____/ I"
      ],
      actionPos: [
        [0, 3]
      ],
      eyesPos: [
        [2, 4],
        [2, 5]
      ],
      tonguePos: [
        [3, 4],
        [3, 5]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/sodomized.cow.js
var require_sodomized_cow = __commonJS({
  "node_modules/cowsayjs/cows/sodomized.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "sodomized",
      template: [
        "      \\                _",
        "       \\              (_)",
        "        \\   ^__^       / \\",
        "         \\  (oo)\\_____/_\\ \\",
        "            (__)\\       ) /",
        "                ||----w ((",
        "                ||     ||>>"
      ],
      actionPos: [
        [0, 6],
        [1, 7],
        [2, 8],
        [3, 9]
      ],
      eyesPos: [
        [3, 13],
        [3, 14]
      ],
      tonguePos: [
        [5, 13],
        [5, 14]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/stegosaurus.cow.js
var require_stegosaurus_cow = __commonJS({
  "node_modules/cowsayjs/cows/stegosaurus.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "stegosaurus",
      template: [
        "\\                             .       .",
        " \\                           / `.   .' \"",
        "  \\                  .---.  <    > <    >  .---.",
        "   \\                 |    \\  \\ - ~ ~ - /  /    |",
        "         _____          ..-~             ~-..-~",
        "        |     |   \\~~~\\.'                    `./~~~/",
        "       ---------   \\__/                        \\__/",
        `      .'  O    \\     /               /       \\  "`,
        "     (_____,    `._.'               |         }  \\/~~~/",
        "      `----.          /       }     |        /    \\__/",
        "            `-.      |       /      |       /      `. ,~~|",
        "                ~-.__|      /_ - ~ ^|      /- _      `..-'",
        "                     |     /        |     /     ~-.     `-. _  _  _",
        "                     |_____|        |_____|         ~ - . _ _ _ _ _>"
      ],
      actionPos: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/stimpy.cow.js
var require_stimpy_cow = __commonJS({
  "node_modules/cowsayjs/cows/stimpy.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "stimpy",
      template: [
        "  \\     .    _  .    ",
        "   \\    |\\_|/__/|    ",
        "       / / \\/ \\  \\  ",
        "      /__|O||O|__ \\ ",
        "     |/_ \\_/\\_/ _\\ |  ",
        "     | | (____) | ||  ",
        "     \\/\\___/\\__/  // ",
        "     (_/         ||",
        "      |          ||",
        "      |          ||\\   ",
        "       \\        //_/  ",
        "        \\______//",
        "       __ || __||",
        "      (____(____)"
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/supermilker.cow.js
var require_supermilker_cow = __commonJS({
  "node_modules/cowsayjs/cows/supermilker.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "supermilker",
      template: [
        "  \\   ^__^",
        "   \\  (oo)\\_______        ________",
        "      (__)\\       )\\/\\    |Super |",
        "          ||----W |       |Milker|",
        "          ||    UDDDDDDDDD|______|"
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ],
      eyesPos: [
        [1, 7],
        [1, 8]
      ],
      tonguePos: [
        [3, 7],
        [3, 8]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/surgery.cow.js
var require_surgery_cow = __commonJS({
  "node_modules/cowsayjs/cows/surgery.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "surgery",
      template: [
        "          \\           \\  /",
        "           \\           \\/",
        "               (__)    /\\",
        "               (oo)   O  O",
        "               _\\/_   //",
        "         *    (    ) //",
        "          \\  (\\\\    //",
        "           \\(  \\\\    )",
        "            (   \\\\   )   /\\",
        "  ___[\\______/^^^^^^^\\__/) o-)__",
        " |\\__[=======______//________)__\\",
        " \\|_______________//____________|",
        "     |||      || //||     |||",
        "     |||      || @.||     |||",
        "      ||      \\/  .\\/      ||",
        "                 . .",
        "                '.'.`",
        "",
        "            COW-OPERATION"
      ],
      actionPos: [
        [0, 10],
        [1, 11]
      ],
      eyesPos: [
        [3, 16],
        [3, 17]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/suse.cow.js
var require_suse_cow = __commonJS({
  "node_modules/cowsayjs/cows/suse.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "suse",
      template: [
        "  \\",
        "   \\____",
        "  /@    ~-.",
        "  \\/ __ .- |",
        "   // //  @"
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/telebears.cow.js
var require_telebears_cow = __commonJS({
  "node_modules/cowsayjs/cows/telebears.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "telebears",
      template: [
        "      \\                _",
        "       \\              (_)   <-- TeleBEARS",
        "        \\   ^__^       / \\",
        "         \\  (oo)\\_____/_\\ \\",
        "            (__)\\  you  ) /",
        "                ||----w ((",
        "                ||     ||>> "
      ],
      actionPos: [
        [0, 6],
        [1, 7],
        [2, 8],
        [3, 9]
      ],
      eyesPos: [
        [3, 13],
        [3, 14]
      ],
      tonguePos: [
        [5, 13],
        [5, 14]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/three-eyes.cow.js
var require_three_eyes_cow = __commonJS({
  "node_modules/cowsayjs/cows/three-eyes.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "three-eyes",
      template: [
        "        \\  ^___^",
        "         \\ (ooo)\\_______",
        "           (___)\\       )\\/\\",
        "                ||----w |",
        "                ||     ||"
      ],
      actionPos: [
        [0, 8],
        [1, 9]
      ],
      eyesPos: [
        [1, 12],
        [1, 13],
        [1, 14]
      ],
      tonguePos: [
        [3, 12],
        [3, 13]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/turkey.cow.js
var require_turkey_cow = __commonJS({
  "node_modules/cowsayjs/cows/turkey.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "turkey",
      template: [
        "  \\                                  ,+*^^*+___+++_",
        "   \\                           ,*^^^^              )",
        "    \\                       _+*                     ^**+_",
        "     \\                    +^       _ _++*+_+++_,         )",
        "              _+^^*+_    (     ,+*^ ^          \\+_        )",
        "             {       )  (    ,(    ,_+--+--,      ^)      ^\\",
        "            { (@)    } f   ,(  ,+-^ __*_*_  ^^\\_   ^\\       )",
        "           {:;-/    (_+*-+^^^^^+*+*<_ _++_)_    )    )      /",
        "          ( /  (    (        ,___    ^*+_+* )   <    <      \\",
        "           U _/     )    *--<  ) ^\\-----++__)   )    )       )",
        "            (      )  _(^)^^))  )  )\\^^^^^))^*+/    /       /",
        "          (      /  (_))_^)) )  )  ))^^^^^))^^^)__/     +^^",
        "         (     ,/    (^))^))  )  ) ))^^^^^^^))^^)       _)",
        "          *+__+*       (_))^)  ) ) ))^^^^^^))^^^^^)____*^",
        "          \\             \\_)^)_)) ))^^^^^^^^^^))^^^^)",
        "           (_             ^\\__^^^^^^^^^^^^))^^^^^^^)",
        "             ^\\___            ^\\__^^^^^^))^^^^^^^^)\\\\",
        "                  ^^^^^\\uuu/^^\\uuu/^^^^\\^\\^\\^\\^\\^\\^\\^\\",
        "                     ___) >____) >___   ^\\_\\_\\_\\_\\_\\_\\)",
        "                    ^^^//\\\\_^^//\\\\_^       ^(\\_\\_\\_\\)",
        "                      ^^^ ^^ ^^^ ^"
      ],
      actionPos: [
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 5]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/turtle.cow.js
var require_turtle_cow = __commonJS({
  "node_modules/cowsayjs/cows/turtle.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "turtle",
      template: [
        "    \\                                  ___-------___",
        "     \\                             _-~~             ~~-_",
        "      \\                         _-~                    /~-_",
        "             /^\\__/^\\         /~  \\                   /    \\",
        "           /|  O|| O|        /      \\_______________/        \\",
        "          | |___||__|      /       /                \\          \\",
        "          |          \\    /      /                    \\          \\",
        "          |   (_______) /______/                        \\_________ \\",
        "          |         / /         \\                      /            \\",
        "           \\         \\^\\\\         \\                  /               \\     /",
        "             \\         ||           \\______________/      _-_       //\\__//",
        "               \\       ||------_-~~-_ ------------- \\ --/~   ~\\    || __/",
        "                 ~-----||====/~     |==================|       |/~~~~~",
        "                  (_(__/  ./     /                    \\_\\      \\.",
        "                         (_(___/                         \\_____)_)"
      ],
      actionPos: [
        [0, 4],
        [1, 5],
        [2, 6]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/tux.cow.js
var require_tux_cow = __commonJS({
  "node_modules/cowsayjs/cows/tux.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "tux",
      template: [
        "   \\",
        "    \\",
        "        .--.",
        "       |o_o |",
        "       |:_/ |",
        "      //   \\ \\",
        "     (|     | )",
        "    /'\\_   _/`\\",
        "    \\___)=(___/",
        ""
      ],
      actionPos: [
        [0, 3],
        [1, 4]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/udder.cow.js
var require_udder_cow = __commonJS({
  "node_modules/cowsayjs/cows/udder.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "udder",
      template: [
        "  \\",
        "   \\    (__)",
        "        o o\\",
        "       ('') \\---------",
        "          \\           \\",
        "           |          |\\",
        "           ||---(  )_|| *",
        "           ||    UU  ||",
        "           ==        =="
      ],
      actionPos: [
        [0, 2],
        [1, 3]
      ],
      eyesPos: [
        [2, 8],
        [2, 10]
      ],
      tonguePos: [
        [4, 8],
        [4, 9]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/unipony-smaller.cow.js
var require_unipony_smaller_cow = __commonJS({
  "node_modules/cowsayjs/cows/unipony-smaller.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "unipony-smaller",
      template: [
        "   \\        \\",
        "    \\        \\",
        "     \\       _\\^",
        "      \\    _- oo\\",
        "           \\---- \\______",
        "                 \\       )\\",
        "                ||-----||  \\",
        "                ||     ||"
      ],
      actionPos: [
        [0, 3],
        [1, 4],
        [2, 5],
        [3, 6]
      ],
      eyesPos: [
        [3, 14],
        [3, 15]
      ],
      tonguePos: [
        [5, 12],
        [5, 13]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/unipony.cow.js
var require_unipony_cow = __commonJS({
  "node_modules/cowsayjs/cows/unipony.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "unipony",
      template: [
        "   \\             \\",
        "    \\             \\_",
        "     \\             \\\\",
        "      \\             \\\\/\\",
        "       \\            _\\\\/",
        "        \\         /   -\\",
        "         \\      /  oo   -\\",
        "          \\   /           \\",
        "             |    ---\\    -\\",
        "             \\--/     \\     \\",
        "                       |      -\\",
        "                        \\       -\\         -------------\\    /-\\",
        "                         \\        \\-------/              ---/    \\",
        "                          \\                                  |\\   \\",
        "                           |                                 / |  |",
        "                           \\                                |  \\  |",
        "                            |                              /    \\ |",
        "                            |                             /     \\ |",
        "                             \\                             \\     \\|",
        "                              -              /--------\\    |      o",
        "                               \\+   +---------          \\   |",
        "                                |   |                   |   \\",
        "                                |   |                    \\   |",
        "                                |   |                    |   \\",
        "                                |   |                     \\   |",
        "                                 \\  |                     |   |",
        "                                 |  |                      \\  \\",
        "                                 |  |                      |   |",
        "                                 +--+                       ---+"
      ],
      actionPos: [
        [0, 3],
        [1, 4],
        [2, 5],
        [3, 6],
        [4, 7],
        [5, 8],
        [6, 9],
        [7, 10]
      ],
      eyesPos: [
        [6, 19],
        [6, 20]
      ],
      tonguePos: [
        [10, 14],
        [10, 15]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/vader-koala.cow.js
var require_vader_koala_cow = __commonJS({
  "node_modules/cowsayjs/cows/vader-koala.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "vader-koala",
      template: [
        "   \\",
        "    \\        .",
        "     .---.  //",
        "    Y|o o|Y//",
        "   /_(i=i)K/",
        "   ~()~*~()~",
        "    (_)-(_)",
        "",
        "     Darth",
        "     Vader",
        "     koala"
      ],
      actionPos: [
        [0, 3],
        [1, 4]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/vader.cow.js
var require_vader_cow = __commonJS({
  "node_modules/cowsayjs/cows/vader.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "vader",
      template: [
        "        \\    ,-^-.",
        "         \\   !oYo!",
        "          \\ /./=\\.\\______",
        "               ##        )\\/\\",
        "                ||-----w||",
        "                ||      ||",
        "",
        "               Cowth Vader"
      ],
      actionPos: [
        [0, 8],
        [1, 9],
        [2, 10]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/www.cow.js
var require_www_cow = __commonJS({
  "node_modules/cowsayjs/cows/www.cow.js"(exports, module) {
    "use strict";
    module.exports = {
      name: "www",
      template: [
        "        \\   ^__^",
        "         \\  (oo)\\_______",
        "            (__)\\       )\\/\\",
        "                ||--WWW |",
        "                ||     ||"
      ],
      actionPos: [
        [0, 8],
        [1, 9]
      ],
      eyesPos: [
        [1, 13],
        [1, 14]
      ],
      tonguePos: [
        [3, 13],
        [3, 14]
      ]
    };
  }
});

// node_modules/cowsayjs/cows/index.js
var require_cows = __commonJS({
  "node_modules/cowsayjs/cows/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var corral = [
      require_default_cow(),
      require_apt_cow(),
      require_beavis_zen_cow(),
      require_blowfish_cow(),
      require_bong_cow(),
      require_bud_frogs_cow(),
      require_bunny_cow(),
      require_calvin_cow(),
      require_cheese_cow(),
      require_cock_cow(),
      require_cower_cow(),
      require_daemon_cow(),
      require_dragon_and_cow_cow(),
      require_dragon_cow(),
      require_duck_cow(),
      require_elephant_in_snake_cow(),
      require_elephant_cow(),
      require_eyes_cow(),
      require_flaming_sheep_cow(),
      require_fox_cow(),
      require_ghostbusters_cow(),
      require_gnu_cow(),
      require_head_in_cow(),
      require_hellokitty_cow(),
      require_kangaroo_cow(),
      require_kiss_cow(),
      require_kitty_cow(),
      require_koala_cow(),
      require_kosh_cow(),
      require_luke_koala_cow(),
      require_mech_and_cow_cow(),
      require_meow_cow(),
      require_milk_cow(),
      require_moofasa_cow(),
      require_moose_cow(),
      require_mutilated_cow(),
      require_pony_smaller_cow(),
      require_pony_cow(),
      require_ren_cow(),
      require_satanic_cow(),
      require_sheep_cow(),
      require_skeleton_cow(),
      require_small_cow(),
      require_snowman_cow(),
      require_sodomized_cow(),
      require_stegosaurus_cow(),
      require_stimpy_cow(),
      require_supermilker_cow(),
      require_surgery_cow(),
      require_suse_cow(),
      require_telebears_cow(),
      require_three_eyes_cow(),
      require_turkey_cow(),
      require_turtle_cow(),
      require_tux_cow(),
      require_udder_cow(),
      require_unipony_smaller_cow(),
      require_unipony_cow(),
      require_vader_koala_cow(),
      require_vader_cow(),
      require_www_cow()
    ];
    var customCorral = [];
    function truncate(str, len) {
      return typeof str === "string" ? str.slice(0, len) : "";
    }
    function fix(value, empty, undef, len) {
      if (typeof value !== "string") {
        return truncate(undef, len);
      }
      if (value.length === 0) {
        return truncate(empty, len);
      }
      return truncate(value, len);
    }
    function validatePositionArray(arr) {
      if (arr === void 0) {
        return true;
      }
      if (!Array.isArray(arr)) {
        return false;
      }
      return arr.every(function(pos) {
        return Array.isArray(pos) && pos.length === 2 && typeof pos[0] === "number" && typeof pos[1] === "number";
      });
    }
    function copyCow(cow) {
      var copier = function(pos) {
        return [pos[0], pos[1]];
      };
      return {
        name: cow.name,
        defEyes: cow.defEyes,
        defTongue: cow.defTongue,
        template: cow.template.slice(),
        actionPos: cow.actionPos ? cow.actionPos.map(copier) : void 0,
        eyesPos: cow.eyesPos ? cow.eyesPos.map(copier) : void 0,
        tonguePos: cow.tonguePos ? cow.tonguePos.map(copier) : void 0
      };
    }
    function validateCow(cow, name) {
      var valid = true;
      valid = valid && typeof cow === "object" && cow !== null && !Array.isArray(cow);
      valid = valid && Array.isArray(cow.template);
      valid = valid && cow.template.every(function(line) {
        return typeof line === "string";
      });
      valid = valid && (cow.defEyes === void 0 || typeof cow.defEyes === "string");
      valid = valid && (cow.defTongue === void 0 || typeof cow.defTongue === "string");
      valid = valid && validatePositionArray(cow.actionPos);
      valid = valid && validatePositionArray(cow.eyesPos);
      valid = valid && validatePositionArray(cow.tonguePos);
      if (name) {
        valid = valid && typeof cow.name === "string" && cow.name.length > 0;
      }
      return valid;
    }
    function getCow(name) {
      var cow;
      if (typeof name === "string") {
        cow = utils.find(corral.concat(customCorral), function(cow2) {
          return cow2.name === name;
        });
      }
      if (cow === void 0) {
        cow = corral[0];
      }
      return copyCow(cow);
    }
    function addCow(cow) {
      if (!validateCow(cow, true)) {
        return false;
      }
      if (getCow(cow.name).name === cow.name) {
        return false;
      }
      customCorral.push(cow);
      customCorral.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      return true;
    }
    function removeCow(name) {
      if (typeof name !== "string") {
        return void 0;
      }
      var ind = customCorral.findIndex(function(cow) {
        return cow.name === name;
      });
      if (ind !== -1) {
        return customCorral.splice(ind, 1)[0];
      }
      return void 0;
    }
    function renderCow(cow, action, eyes, tongue) {
      var lines = cow.template.slice();
      var values = [];
      var act = -1;
      if (cow.tonguePos) {
        values.push({ pos: cow.tonguePos, str: fix(tongue, cow.defTongue, "  ", 2) });
      }
      if (cow.eyesPos) {
        values.push({ pos: cow.eyesPos, str: fix(eyes, cow.defEyes, "oo", 2) });
      }
      if (cow.actionPos) {
        values.push({ pos: cow.actionPos, str: fix(action, void 0, void 0, 1) });
        act = values.length - 1;
      }
      values.forEach(function(val, i) {
        var fix2 = 0;
        var f = i !== act;
        val.pos.forEach(function(pos, j) {
          var char = val.str[j] || (f && j === 1 ? "" : val.str.slice(-1));
          var pos0 = pos[0];
          var pos1 = pos[1] - fix2;
          var line = lines[pos0];
          lines[pos0] = line.slice(0, pos1) + char + line.slice(pos1 + 1);
          if (char.length === 0) {
            ++fix2;
          }
        });
      });
      return lines.join("\n");
    }
    module.exports = {
      corral: corral.map(copyCow),
      customCorral,
      validateCow,
      getCow,
      addCow,
      removeCow,
      renderCow
    };
  }
});

// node_modules/cowsayjs/lib/index.js
var require_lib = __commonJS({
  "node_modules/cowsayjs/lib/index.js"(exports, module) {
    var box = require_box();
    var mode = require_mode();
    var cows = require_cows();
    function extendOptions(options, property, value) {
      var extended = typeof options === "object" && options !== null ? {
        message: options.message,
        cow: options.cow,
        mode: options.mode,
        eyes: options.eyes,
        tongue: options.tongue,
        wrap: options.wrap,
        action: options.action
      } : {};
      extended[property] = value;
      return extended;
    }
    function moo(message, options) {
      var opts = typeof message === "object" && message !== null ? message : extendOptions(options, "message", message);
      var action = opts.action === "think" ? "think" : "say";
      var act = action === "think" ? "o" : "\\";
      var eyes;
      var tongue;
      if (typeof opts.mode === "string") {
        var face = mode.modeFace(opts.mode);
        eyes = face.eyes;
        tongue = face.tongue;
      }
      if (typeof opts.eyes === "string" && eyes === void 0) {
        eyes = opts.eyes;
      }
      if (typeof opts.tongue === "string" && tongue === void 0) {
        tongue = opts.tongue;
      }
      var cow;
      switch (typeof opts.cow) {
        case "string":
          cow = cows.getCow(opts.cow);
          break;
        case "object":
          cow = cows.validateCow(opts.cow) ? opts.cow : cows.corral[0];
          break;
        default:
          cow = cows.corral[0];
      }
      return box.perform(action, opts.message, opts.wrap) + cows.renderCow(cow, act, eyes, tongue);
    }
    function cowsay(message, options) {
      return typeof message === "object" && message !== null ? moo(extendOptions(message, "action", "say")) : moo(message, extendOptions(options, "action", "say"));
    }
    function cowthink(message, options) {
      return typeof message === "object" && message !== null ? moo(extendOptions(message, "action", "think")) : moo(message, extendOptions(options, "action", "think"));
    }
    module.exports = {
      moo,
      cowsay,
      cowthink
    };
  }
});
export default require_lib();
//# sourceMappingURL=cowsayjs.js.map
