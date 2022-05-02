// NestedCheckList_Parser.js
// Author : Calum Knott

// Parses to the format required for a NestedList

// import { Importer as Checklist_Importer } from './Checklist_Parser.js'


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
		case "none":
			items = blocks.items.map((item, index) => ` ${item}`);
			return items;
		default:
			break;
	}
};
 







let removeKeys = (obj, keys) => {
	let deep_obj = JSON.parse(JSON.stringify(obj));
	var index;
	for (var prop in deep_obj) {
		// important check that this is objects own property
		// not from prototype prop inherited
		if(deep_obj.hasOwnProperty(prop)){
			switch(typeof(deep_obj[prop])){
				case 'string':
					index = keys.indexOf(prop);
					if(index > -1){
						delete deep_obj[prop];
					}
					break;
				case 'object':
					index = keys.indexOf(prop);
					if(index > -1){
						delete deep_obj[prop];
					}else{
						removeKeys(deep_obj[prop], keys);
					}
					break;
			}
		}
	}
	return deep_obj
  }



// Function to reformat from Markdown AST to editorjs-nested-checklist format
// Original code provided by : 
// https://www.reddit.com/r/learnjavascript/comments/u831ha/parsing_recursive_json_from_markdown_ast/i5krwye/?context=3
let ast_to_ejs = (input) => {
	const { type, children } = input;
	if (type === "nestedchecklist") {
	  const data = {};
	  data.style = input.ordered ? 'ordered' : 'unordered';
	  data.items = children.map(ast_to_ejs);
	  return { type: 'list', data };
  
	} else if (type === 'list') {
	   return children.map(ast_to_ejs);
  
	} else if (type === 'listItem') {
	  const checked = input.checked;
	  const content = children[0].children[0].value;
	   const items = children[1] ? ast_to_ejs(children[1]) : [];
	   return { content, checked, items };
	 }
  };
  


console.logger = (obj) => { console.log(JSON.parse(JSON.stringify(obj)))}

let Importer = (blocks) => {

	let tree = blocks
	let tree2 = removeKeys(tree,["position", "spread"])

	//edit the first item to 'nestedchecklist' to match function, (all others are 'list' and match original AST - 
	//Must be done outside the function, as it is recursvie!
	tree2.type = "nestedchecklist"  
	let tree3 = ast_to_ejs(tree2) // reformat the object

	return tree3

};

export { Importer, Exporter };
