// List_Parser.js
// Author : Calum Knott

// Parses to the format required for a Basic List ONLY


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

	let has_checked_true_or_false = null

	blocks.children.forEach((items) => {

		if(items.checked === null){
			// If it is a normal list

			items.children.forEach((listItem) => {
				listItem.children.forEach((listEntry) => {
					itemData.push(listEntry.value);
				});
			});

		}else{
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
		}

		
	});

	if( has_checked_true_or_false === null ){
		// If it is a normal list

		listData = {
			data: {
				items: itemData,
				style: blocks.ordered ? "ordered" : "unordered",
			},
			type: "list",
		};

	}else{
		// If it is a checked list

		listData = {
			data: {
				items: itemData,
				style: blocks.ordered ? "ordered" : "unordered",
			},
			type: "checklist",
		};


	}



	return listData;
};

export { Importer, Exporter };
