---
name: "Feature request"
about: "Request a new change or feature for the tf-schema library"
title: "[FEATURE] - "
labels: ["enhancement"]
---

## Feature description

Provide a clear and concise description of the feature or improvement you are requesting.

## Motivation

Explain why this feature or improvement is needed. Describe the problem it would solve or the use case it would address.

## Detailed explanation

Provide a detailed description of the proposed feature or improvement. If applicable, include examples to demonstrate how it would work.

## Example Usage

If applicable, provide an example of how the new feature or improvement would be configured in the ItemSchema class.

```js
import SteamErrorFactory from "./factory";
import { VDF } from "@mann-conomy/vdf-utils";
import { WarPaintMapper } from "../lib/mappers";
import type { WarPaint } from "../types/schema";
import type { PrototypeObjectDefinitions } from "@mann-conomy/tf-war-paints";

export default class SchemaClient {
    ...
    public async getWarPaints(url: string | URL | globalThis.Request): Promise<WarPaint[]> {
        const response = await fetch(url);
        if (!response.ok) {
            throw await SteamErrorFactory.fromResponse(response);
        }

        const prototypes = await response.text();
        const definitions = VDF.parse<PrototypeObjectDefinitions>(prototypes);
        return WarPaintMapper.map(definitions.lang.Tokens);
    }
}
```

## Expected behaviour

Describe what the expected behaviour or output would be when the feature is used.

## Additional context

Add any other context or information that might help us understand the request. This could include references to relevant documentation or community discussions.

## Alternatives considered

If applicable, describe any alternative solutions or features you considered and why you believe the proposed feature is the best option.

## Related Issues

If there are any related issues, please link them here.

---

**Please note that feature requests are considered based on their impact, feasibility, and alignment with the Mann-Conomy project's goals. Providing detailed and well-thought-out information will help in evaluating your request.**

Your feedback is invaluable. Thank you for helping improve the Mann-Conomy Project!
