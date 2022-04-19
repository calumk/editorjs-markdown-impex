import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";

// Import Official Block Support
import { Importer as Header_Importer } from "./block_type_parsers/official/Header_Parser";
import { Importer as Paragraph_Importer } from "./block_type_parsers/official/Paragraph_Parser";
import { Importer as List_Importer } from "./block_type_parsers/official/List_Parser";
import { Importer as Delimiter_Importer } from "./block_type_parsers/official/Delimiter_Parser";
import { Importer as Code_Importer } from "./block_type_parsers/official/Code_Parser";
import { Importer as Table_Importer } from "./block_type_parsers/official/Table_Parser";

// Import Unofficial Block Support
import { Importer as Alert_Importer } from "./block_type_parsers/unofficial/Alert_Parser";
import { Importer as CodeFlask_Importer } from "./block_type_parsers/unofficial/CodeFlask_Parser";

export const editorData = [];

/**
 * Markdown Import class
 */
export default class MarkdownImporter {
	/**
	 * Returns true to notify the core that read-only mode is supported
	 *
	 * @return {boolean}
	 */
	static get isReadOnlySupported() {
		return true;
	}

	/**
	 * creates the Importer plugin
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
			title: "Import Markdown",
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E202B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
		};
	}

	/**
	 * @return invinsible file upload form
	 */
	render() {
		const doc = document.createElement("input");
		doc.setAttribute("id", "file-upload");
		doc.setAttribute("type", "file");
		doc.setAttribute("style", "display: none");
		doc.setAttribute("name", "files[]");
		doc.setAttribute("onload", this.parseMarkdown());

		return doc;
	}

	/**
	 * Function which parses markdown file to JSON which correspons the the editor structure
	 * @return Parsed markdown in JSON format
	 */
	async parseMarkdown() {
		// empty the array before running the function again
		editorData.length = 0;

		const a = {};
		const data = await this.api.saver.save();
		a.content = data.blocks;

		const fileUpload = document.getElementById("file-upload");

		fileUpload.onchange = (e) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.readAsText(file, "UTF-8");

			reader.onload = async (readerEvent) => {
				const content = readerEvent.target.result;

				// const parsedMarkdown = remark().parse(content);
				let parsedMarkdown = await unified()
					.use(remarkParse)
					.use(remarkGfm)
					.use(remarkUnwrapImages)
					.parse(content);
				// Support GFM (tables, autolinks, tasklists, strikethrough).
				// iterating over the pared remarkjs syntax tree and executing the json parsers

				let importBlockTypesMap = {
					paragraph: (item) => {
						return Paragraph_Importer(item);
					},
					heading: (item) => {
						return Header_Importer(item);
					},
					list: (item) => {
						return NestedList_Importer(item);
					},
					thematicBreak: (item) => {
						return Delimiter_Importer(item);
					},
					// 'code' : (item) => {
					//   return Code_Importer(item);
					// },
					code: (item) => {
						return CodeFlask_Importer(item);
					},
					blockquote: (item) => {
						return Alert_Importer(item);
					},
					table: (item) => {
						return Table_Importer(item);
					},
				};

				parsedMarkdown.children.forEach((item, index) => {
					// Pass the item, to the blocktype.
					// looks up the type in the object literals
					console.log("=============================");
					console.log("Attempting to Import block : ");
					console.log(item);

					let parsedBlock = {};

					try {
						parsedBlock = importBlockTypesMap[item.type](item);
						console.log("Block Imported :");
						console.log(parsedBlock);
					} catch {
						console.log("Block Not Imported!");
					}

					console.log("=============================");

					editorData.push(parsedBlock);
				});

				// clear the editor
				this.api.blocks.clear();
				// render the editor with imported markdown data
				this.api.blocks.render({
					blocks: editorData.filter(
						(value) => Object.keys(value).length !== 0
					), // filter through array and remove empty objects
				});

				return await unified()
					.use(remarkParse)
					.use(remarkGfm)
					.parse(content);
			};
		};

		fileUpload.click();
	}

	save() {
		return {
			message: "Uploading Markdown",
		};
	}
}
