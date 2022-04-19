// Paragraph_Parser.js
// Author : Calum Knott

// Imports paragraphs and also images - weirdly

// EditorJs -> Markdown
let Exporter = (blocks) => {
  console.log("Exporting Paragraph:")
  console.log(blocks)
  return `${blocks.text}\n`;
}

// Markdown -> EditorJs
let Importer = (blocks) => {
  let paragraphData = {};

  if (blocks.type === 'paragraph') {
    blocks.children.forEach((item) => {
      if (item.type === 'text') {
        paragraphData = {
          data: {
            text: item.value,
          },
          type: 'paragraph',
        };
      }
      if (item.type === 'image') {
        paragraphData = {
          data: {
            caption: item.title,
            stretched: false,
            url: item.url,
            withBackground: false,
            withBorder: false,
          },
          type: 'image',
        };
      }
    });
  }
  return paragraphData;
}


export { Importer, Exporter}