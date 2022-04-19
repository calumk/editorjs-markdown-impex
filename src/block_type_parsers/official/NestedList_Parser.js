// NestedList_Parser.js
// Author : Calum Knott

// Parses to the format required for a NestedList

import { Importer as Checklist_Importer } from './Checklist_Parser.js'


// EditorJs -> Markdown
let Exporter = (blocks) => {
	let items = {};
	switch (blocks.style) {
		case "unordered":
			items = blocks.items.map((item) => `* ${item}`);
			return items;
		case "ordered":
			items = blocks.items.map((item, index) => `${index + 1} ${item}`);
			return items;
		default:
			break;
	}
};

// Markdown -> EditorJs
let Importer = (blocks) => {
	let listData = {};
	const itemData = [];

	// first work out if it is a checklist, if it is, jump to the checklist importer
	blocks.children.forEach((items) => {
		if(items.checked !== null){
			console.log("!!! Calling Checklist importer")
			return Checklist_Importer(blocks)
		}
	});

	// If it is a normal list
	blocks.children.forEach((items) => {
		items.children.forEach((listItem) => {
			listItem.children.forEach((listEntry) => {
				itemData.push(listEntry.value);
			});
		});
		
	});

	return listData = {
		data: {
			items: itemData,
			style: blocks.ordered ? "ordered" : "unordered",
		},
		type: "nestedlist",
	};

};

export { Importer, Exporter };
