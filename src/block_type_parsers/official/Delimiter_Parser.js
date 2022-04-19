// Delimitor_Parser.js
// Author : Calum Knott

// EditorJs -> Markdown

let Exporter = (blocks) => {
	const delimiter = "---";

	return delimiter.concat("\n");
};

// Markdown -> EditorJs
let Importer = (blocks) => {
	let delimiterData = {};

	delimiterData = {
		data: {
			items: [],
		},
		type: "delimiter",
	};

	return delimiterData;
};

export { Importer, Exporter };
