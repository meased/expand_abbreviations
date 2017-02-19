function current_layer() {
    var layers = require("josm/layers");
    return layers.activeLayer;
}

function name_expand(name) {
    var console = require("josm/scriptingconsole");
    var expanded = [];
    var words = name.split(" ");

    var mappings = [
        ["dr", "Drive"],
        ["ave", "Avenue"],
        ["blvd", "Boulevard"],
        ["bl", "Boulevard"],
        ["cr", "Crossing"],
        ["cir", "Circle"],
        ["ct", "Court"],
        ["cv", "Cove"],
        ["hwy", "Highway"],
        ["ln", "Lane"],
        ["pl", "Place"],
        ["st", "Street"],
        ["tr", "Trail"],
        ["trl", "Trail"],
        ["wy", "Way"],
        ["pkwy", "Parkway"],
        ["pky", "Parkway"],
        ["rd", "Road"],
        ["ca", "Calle"],
        ["n", "North"],
        ["e", "East"],
        ["s", "South"],
        ["w", "West"],
        ["ne", "Northeast"],
        ["nw", "Northwest"],
        ["se", "Southeast"],
        ["sw", "Southwest"],
    ];

    for (var i = 0; i < words.length; ++i) {
        var word = words[i];
        var lword = word.toLowerCase();

        if (lword.length() == 0) continue;

        // Remove any trailing "." so things like "Dr." will match "Dr"
        if (lword.slice(lword.length() - 1, lword.length()) == '.') {
            lword = lword.slice(0, lword.length() - 1);
        }
        var replaced = false;
        // Check all mappings, replace if match found
        for (var j = 0; j < mappings.length; ++j) {
            if (lword == mappings[j][0]) {
                if (lword == "cr") {
                    console.println("        WARNING: Cr could be Crossing or Creek")
                }
                else if (lword == "St") {
                    console.println("        WARNING: St could be Street or Saint")
                }
                expanded.push(mappings[j][1]);
                replaced = true;
            }
        }
        // Keep original word
        if (!replaced) expanded.push(word);
    }
    return expanded.join(" ");
}

function main() {
    var console = require("josm/scriptingconsole");
    var layer = current_layer();
    if (layer == null) {
        console.println("Current layer empty, aborting.");
        return;
    }
    var util = require("josm/util");
    var command = require("josm/command");
    var dataset = layer.data;
    var result = dataset.query("type:way");
    var renames = 0;

    console.println("\nFound " + result.length + " ways in current layer.");
    for (j = 0; j < result.length; j++) {
        var way = result[j];
        var name = way.get("name");
        if (name == null) continue;
        if (name.length() < 4) continue;
        var words = name.split(" ");
        if (words.length < 2) continue;
       
        newname = name_expand(name);
        if (name == newname) continue;

        console.println("    Renaming  [" + name + "]  to  [" + newname + "]");

        layer.apply( command.change(dataset.way(way.id), {tags: {name: newname}}) );
        renames++;
        way.setModified(true);
    }
    console.println("Modified " + renames + " ways.");
}

main();

