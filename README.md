# expand_abbreviations.js

A JOSM script to expand OpenStreetMap street name abbreviations.

Each way in the downloaded area is checked word for word against a list of common abbreviations, if a match is found that word is expanded. Also expands directions (N, S, NW, SE, …). Abbreviations may or may not end with a “.” (e.g. Blvd. and Blvd are treated the same).

This script is based on [rename_abbreviated_highways.js](https://gist.github.com/Rub21/feb83f57a727ac0d8a34), but is modified to expand any word in the name instead of just the last, and to make it easier to change/modify the mappings.

## Configuration

1. Download [expand_abbreviations.js](https://github.com/meased/expand_abbreviations/blob/master/expand_abbreviations.js).
2. Install the JOSM [scripting](http://wiki.openstreetmap.org/wiki/JOSM/Plugins/Scripting) plugin.

## Usage

1. Download an area of OSM data.
2. Bring up the *scripting console*
    - **Scripting** → **Show scripting console**.
3. Open `expand_abbreviations.js` in the scripting console
    - **File** → **Open**.
4. Run the script.
    - **Run**.
6. Review the changes.
    - A list of all applied renames will be shown in the scripting log, pay attention to abbreviations that are not distinct (e.g. Creek, Crossing, Street, Saint, etc…) or not needed (e.g. on streets named after letters, N, S, E, W should not be expanded).
7. If you need to adjust something use the JOSM find feature.
    - `Ctrl+F`, type the way name, and fix it manually.

## Customizing

The variable *mappings* at the top of the script can be adjusted to change mappings, or add more. Just follow the format of the others.

Enjoy.
