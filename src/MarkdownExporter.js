// Import Support for Official Blocks
import { Exporter as Header_Exporter } from "./block_type_parsers/official/Header_Parser";
import { Exporter as Paragraph_Exporter } from "./block_type_parsers/official/Paragraph_Parser";
import { Exporter as Delimiter_Exporter } from "./block_type_parsers/official/Delimiter_Parser";

import { Exporter as List_Exporter } from "./block_type_parsers/official/List_Parser";
import { Exporter as Code_Exporter } from "./block_type_parsers/official/Code_Parser";
import { Exporter as Table_Exporter } from "./block_type_parsers/official/Table_Parser";

import { Exporter as Image_Exporter } from "./block_type_parsers/official/Image_Parser";
import { Exporter as Checklist_Exporter } from "./block_type_parsers/official/Checklist_Parser";

// Import Support for Unofficial Blocks
import { Exporter as Alert_Exporter } from "./block_type_parsers/unofficial/Alert_Parser";
import { Exporter as CodeFlask_Exporter } from "./block_type_parsers/unofficial/CodeFlask_Parser";

import { fileDownloadHandler } from "./FileHandler";

/**
 * Markdown Export class
 */
export default class MarkdownExporter {
	/**
	 * Returns true to notify the core that read-only mode is supported
	 *
	 * @return {boolean}
	 */
	static get isReadOnlySupported() {
		return true;
	}

	/**
	 * creates the Parser plugin
	 * {editorData, api functions} - necessary to interact with the editor
	 */
	constructor({ data, api }) {
		this.data = data;
		this.api = api;
	}

	/**
	 * @return Plugin data such as title and icon
	 */
	static get toolbox() {
		return {
			title: "Download Markdown",
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E202B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
		};
	}

	/**
	 * @return empty div and run the export funtion
	 */
	render() {
		const doc = document.createElement("div");

		this.getContent();
		return doc;
	}

	/**
	 * Function which takes saved editor data and runs the different parsing helper functions
	 * @return Markdown file download
	 */
	async getContent() {
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, "0");
		const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
		const yyyy = today.getFullYear();

		const initialData = {};
		const data = await this.api.saver.save();

		initialData.content = data.blocks;

		let exportBlockTypesMap = {
			paragraph: (item) => {
				return Paragraph_Exporter(item);
			},
			header: (item) => {
				return Header_Exporter(item);
			},
			list: (item) => {
				return List_Exporter(item);
			},
			thematicBreak: (item) => {
				return Delimiter_Exporter(item);
			},
			code: (item) => {
				return Code_Exporter(item);
			},
			blockquote: (item) => {
				return Alert_Exporter(item);
			},
			table: (item) => {
				return Table_Exporter(item);
			},
		};

		let parsedData = "";

		initialData.content.forEach((item, index) => {
			console.log("=============================");
			console.log("Attempting to Export block : ");
			console.log(item);

			let parsedBlock = "";

			try {
				parsedBlock = exportBlockTypesMap[item.type](item.data);
				console.log("Block Exported :");
				console.log(parsedBlock);
			} catch {
				console.log("Block Not Exported!");
			}

			console.log("=============================");

			parsedData += parsedBlock;
		});

		// take parsed data and create a markdown file
		fileDownloadHandler(
			parsedData.join("\n"),
			`entry_${dd}-${mm}-${yyyy}.md`
		);
	}

	save() {
		return { message: "Downloading Markdown" };
	}
}
