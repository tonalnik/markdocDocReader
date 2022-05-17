import { NextApiRequest, NextApiResponse } from "next";
import Markdoc from "@markdoc/markdoc";
import { test_tag } from "../markdoc/tags";
import React from "react";
import fs from "fs";

export default function Home({ data }: { data: any }) {
	return Markdoc.renderers.react(JSON.parse(data), React, {
		components: {
			Test_tag: ({ title, icon, children }) => {
				return (
					<>
						<div>
							{title} {icon}
						</div>
						{children}
					</>
				);
			},
		},
	});
}

export async function getServerSideProps({ req, query, res }: { req: NextApiRequest; query; res: NextApiResponse }) {
	const doc = fs.readFileSync(process.cwd() + "/test.md", "utf8");
	const config = {
		tags: {
			test_tag,
		},
	};

	const ast = Markdoc.parse(doc);
	for (const node of ast.walk()) {
		console.log("====================");
		console.log(node);
		console.log("====================");
	}
	fs.writeFileSync(process.cwd() + "/2.json", JSON.stringify(ast));

	const content = Markdoc.transform(ast, config as any);

	fs.writeFileSync(process.cwd() + "/1.json", JSON.stringify(content));

	return {
		props: { data: JSON.stringify(content) },
	};
}
