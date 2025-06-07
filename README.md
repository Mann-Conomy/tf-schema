# tf-schema

A Node.js wrapper for Team Fortress 2 schema-related methods from the Steam Web API.

[![npm version](https://img.shields.io/npm/v/@mann-conomy/tf-schema?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/tf-schema)
[![npm downloads](https://img.shields.io/npm/d18m/@mann-conomy/tf-schema?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/tf-schema)
[![Node.js version](https://img.shields.io/node/v/@mann-conomy/tf-schema?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![GitHub actions](https://img.shields.io/github/actions/workflow/status/Mann-Conomy/tf-schema/test.yml?branch=main&style=flat-square&logo=github&label=test)](https://github.com/Mann-Conomy/tf-schema/blob/main/.github/workflows/test.yml)
[![GitHub license](https://img.shields.io/github/license/Mann-Conomy/tf-schema?style=flat-square&logo=github)](https://github.com/Mann-Conomy/tf-schema/blob/main/LICENSE)

## Installation

Using [npm](https://www.npmjs.com/package/@mann-conomy/tf-schema):

```bash
$ npm install @mann-conomy/tf-schema
```

Using [yarn](https://yarnpkg.com/package/@mann-conomy/tf-schema):

```bash
$ yarn add @mann-conomy/tf-schema
```

## Testing

Using [npm](https://docs.npmjs.com/cli/v8/commands/npm-run-script):
```bash
$ npm test
```

Using [yarn](https://classic.yarnpkg.com/lang/en/docs/cli/run/):
```bash
$ yarn test
```

## Examples

Fetching the full Team Fortress 2 item schema from the Steam Web API.

```js
import { SchemaClient } from "@mann-conomy/tf-schema";

const client = new SchemaClient(process.env.STEAM_WEB_API_KEY!);

(async() => {
    try {
        const schema = await client.getItemSchema();
        const item = schema.getItemByName("Team Captain", true);
        console.log(item?.defindex, item?.item_class);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching the item schema", error.message);
        }
    }
})();
```

Importing the Team Fortress 2 item schema from a static source, such as a local JSON file.

```js
import { ItemSchema } from "@mann-conomy/tf-schema";

(async() => {
    try {
        const schema = await ItemSchema.import("./assets/static/schema.json");
        const name = schema.getQualityNameById(11);
        console.log(name); // Strange
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error importing the item schema", error.message);
        }
    }
})();
```

Some more examples are available in the [examples](https://github.com/Mann-Conomy/tf-schema/tree/main/examples) and [test](https://github.com/Mann-Conomy/tf-schema/tree/main/test) directories.

## Documentation

See the [Wiki pages](https://github.com/Mann-Conomy/tf-schema/wiki) for further documentation.

## Contributors

The type descriptions used in this project are based on the work of the amazing contributors over at the [Team Fortress 2 Wiki](https://wiki.teamfortress.com/wiki/Item_schema).

Huge thanks to them for their dedication and detailed documentation!

## License

[MIT](LICENSE)

Copyright 2025, The Mann-Conomy Project
