// Table_Parser.js
// Author : Calum Knott

import { CliPrettify } from 'markdown-table-prettify';
// used to make the table look nice in markdown - technically optional

// EditorJs -> Markdown
let Exporter = (blocks) => {
  let md = ''

  let firstRow = true;
  blocks.content.forEach((row) =>{

    md += '|';
    row.forEach((cell) => {
      md += ` ${ cell } |`
    });
    md += '\n';

    if (firstRow) {

      firstRow = false;

      md += '|';
      row.forEach((cell) => {
        md += ` --- |`
      });
      md += '\n';

    }

  });
  return CliPrettify.prettify(md, { columnPadding: 1 })
}


// Markdown -> EditorJs
let Importer = (blocks) => {

  let exportData = {};
  exportData.data = {}
  exportData.data.withHeadings = true;
  exportData.data.content = []
  exportData.type = 'table'

  blocks.children.forEach((tableRow) => {
    let newRow = []
      tableRow.children.forEach((cell) => {
        newRow.push(cell.children[0].value)
      });
    exportData.data.content.push(newRow)
  });

  return exportData;
}

export { Importer, Exporter }