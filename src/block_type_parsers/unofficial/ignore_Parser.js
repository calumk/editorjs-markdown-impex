// ignore_Parser.js
// Author : Calum Knott calum@calumk.com

// can be used to specifically ignore types of import/export by returning empty

// Markdown -> EditorJs
let Importer = (blocks) => {
	return {};
};

// EditorJs -> Markdown
let Exporter = (blocks) => {
	return '';
};

export { Importer, Exporter };
