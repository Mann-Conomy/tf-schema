import type { SchemaItem } from "../types/schema";
import SteamErrorFactory from "../classes/factory";
import type UrlBuilder from "../classes/builders/url";
import { SteamConstants } from "../resources/constants";
import type { GetSchemaItemsResponse, GetSchemaItemsResult } from "../types/steam";

export async function getSchemaItems(builder: UrlBuilder, items: SchemaItem[] = []): Promise<GetSchemaItemsResult> {
    const url = builder.toString();
    const response = await fetch(url);
    if (!response.ok) {
        throw await SteamErrorFactory.fromResponse(response);
    }

    const schema = await response.json() as GetSchemaItemsResponse;
    if (schema.result.next) {
        builder.getSearchParams().set(SteamConstants.StartParameter, schema.result.next.toString());
        return getSchemaItems(builder, items);
    }

    schema.result.items = items;
    return schema.result;
}
