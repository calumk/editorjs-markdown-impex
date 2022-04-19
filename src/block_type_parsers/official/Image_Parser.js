// Image_Parser.js
// Author : Calum Knott

// EditorJs -> Markdown
let Exporter = (blocks) => {
	return `![${blocks.caption}](${blocks.url} "${blocks.caption}")`.concat(
		"\n"
	);
};

// Markdown -> EditorJs

// Note : Images are imported using the Paragraph Parser....  :/

export { Exporter };
