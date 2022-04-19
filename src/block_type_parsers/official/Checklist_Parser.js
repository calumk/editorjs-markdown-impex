// Checklist_Parser.js
// Author : Calum Knott

// EditorJs -> Markdown
let Exporter = (blocks) => {
	let items = {};

	items = blocks.items.map((item) => {
		if (item.checked === true) {
			return `- [x] ${item.text}`;
		}
		return `- [ ] ${item.text}`;
	});

	return items.join("\n");
};



// Markdown -> EditorJs
// Called from the List_Parser Importer, or from the NestedList_Parser
let Importer = (blocks) => {
	let listData = {};
	const itemData = [];

	let has_checked_true_or_false = null

	blocks.children.forEach((items) => {

		// If it is a checked list

		has_checked_true_or_false = true
		
		items.children.forEach((listItem) => {
			listItem.children.forEach((listEntry) => {

				console.log(listEntry)

				itemData.push({
					"text" : listEntry.value,
					"checked" : items.checked
				});
			});
		});

		
	});

	listData = {
		data: {
			items: itemData,
			style: blocks.ordered ? "ordered" : "unordered",
		},
		type: "checklist",
	};

	return listData;
};


export { Importer, Exporter };
