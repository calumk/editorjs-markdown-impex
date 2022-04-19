// Alert_Parser.js
// Author : Calum Knott calum@calumk.com

// Works with editorjs-alert
// https://github.com/vishaltelangre/editorjs-alert

// Supports Importing Quotes, but will export as a quote with and alert color square

// Markdown -> EditorJs
let Importer = (blocks) => {
    let alertData = {};

    var emoji = {
        ':blue_square:': 'primary',
        ':yellow_square:': 'secondary',
        ':purple_square:': 'info',
        ':green_square:': 'success',
        ':orange_square:': 'warning',
        ':red_square:': 'danger',
        ':white_large_square:': 'light',
        ':black_large_square:': 'dark'
    };

    // convert all blocks here to a string (html string)
    let string = ''
    blocks.children.forEach((items) => {
        items.children.forEach((alertItem) => {
            string += alertItem.value
        });
    });


    const regex = /([:])\w+([:])/g; // the regex to match emoji
    let found = string.match(regex);

    let type = 'primary'
    if (found != null) {
        if (found.length >= 1) {
            type = emoji[found[0]]
        }
    }

    alertData = {
        data: {
            type: type,
            message: string.replace(regex, '')
        },
        type: 'alert'
    };


    return alertData;
}


// EditorJs -> Markdown
let Exporter = (blocks) => {
    var emoji = {
        'primary': ':blue_square:',
        'secondary': ':yellow_square:',
        'info': ':purple_square:',
        'success': ':green_square:',
        'warning': ':orange_square:',
        'danger': ':red_square:',
        'light': ':white_large_square:',
        'dark': ':black_large_square:'
    };
    return `> ${
        emoji[blocks.type]
    } ${
        blocks.message
    }\n`;
}

// Markdown -> EditorJs

// Alerts are not valid markdown.
// See Quote importer for the importer for Alerts

export {
    Importer,
    Exporter
}
