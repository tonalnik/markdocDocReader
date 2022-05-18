import { NextApiRequest, NextApiResponse } from "next";
import Markdoc from "@markdoc/markdoc";
import { test_tag } from "../markdoc/tags";
import React from "react";
import fs from "fs";

export default function Home({ data }: { data: any }) {
	return Markdoc.renderers.react(JSON.parse(data), React, {
		components: {
			Test_tag: (props) => {
				return (
					<>
						<div>{props.children}</div>
					</>
				);
			},
			Fence(props) {
				return <div>test fence component text</div>;
			},
		},
	});
}

export async function getServerSideProps({ req, query, res }: { req: NextApiRequest; query; res: NextApiResponse }) {
	const doc = fs.readFileSync(process.cwd() + "/test.md", "utf8");

	const fence = {
		render: "Fence",
		attributes: {
			language: {
				type: String,
			},
		},
	};

	const config = {
		nodes: {
			fence,
		},
		tags: {
			test_tag,
		},
	};

	const ast = Markdoc.parse(doc);
	fs.writeFileSync(process.cwd() + "/ast.json", JSON.stringify(ast));

	const content = Markdoc.transform(ast, config as any);

	walkTree(content, "name", "Fence", changeNodeType);
	fs.writeFileSync(process.cwd() + "/render.json", JSON.stringify(content));

	return {
		props: { data: JSON.stringify(content) },
	};
}

const walkTree = (tree, keyToFind, valueToFind, func) => {
	if (tree[keyToFind] == valueToFind) func(tree, keyToFind, valueToFind);
	if (tree.children) for (const node of tree.children) walkTree(node, keyToFind, valueToFind, func);
};

const changeNodeType = (node) => {
	if (!node.attributes.language) return node;
	node.attributes.content = node.children[0];
	node.name = node.attributes.language;
};
