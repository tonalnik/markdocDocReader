import { Tag } from "@markdoc/markdoc";

export const fence = {
	transform(node, config) {
		const children = node.transformChildren(config);
		const lang = node.attributes.language;

		return new Tag(`custom-tag`, { lang }, children);
	},
};
