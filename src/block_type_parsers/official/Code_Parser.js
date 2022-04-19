// Code_Parser.js
// Author : Calum Knott

// EditorJs -> Markdown
let Exporter = (blocks) => {
	return `\`\`\`\n${blocks.code}\n\`\`\`\n`;
};

// Markdown -> EditorJs
let Importer = (blocks) => {
	const codeData = {
		data: {
			code: blocks.value,
		},
		type: "code",
	};

	return codeData;
};

export { Importer, Exporter };
