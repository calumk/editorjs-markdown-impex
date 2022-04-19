// CodeFlask_Parser.js
// Author : Calum Knott calum@calumk.com

// Works with editorjs-codeflask
// https://github.com/calumk/editorjs-codeflask


// EditorJs -> Markdown
let Exporter = (blocks) => {
	return `\`\`\`${blocks.language}\n${blocks.code}\n\`\`\`\n`;
};

// Markdown -> EditorJs
let Importer = (blocks) => {
	const codeData = {
		data: {
			code: blocks.value,
            language : blocks.lang,
			showlinenumbers : true
		},
		type: "code",
	};
	return codeData
};

export { Importer, Exporter };
