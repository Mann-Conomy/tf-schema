import EventEmitter from "events";
import SchemaClient from "./client";
import type ItemSchema from "./schema";
import type { SchemaOptions } from "../types/schema";

export type SchemaIdentifier = string | number;
export type ClientIdentifier = string | number;

export interface SchemaManagerOptions extends Partial<SchemaOptions> {
    identifier: ClientIdentifier;
}

export default class SchemaManager extends EventEmitter {
    private readonly schemas: Map<SchemaIdentifier, ItemSchema>;
    private readonly clients: Map<ClientIdentifier, SchemaClient>;

    constructor(apiKey: string, clients: SchemaManagerOptions[]) {
        super();

        this.schemas = new Map();
        this.clients = new Map(clients.map(options => [options.identifier, new SchemaClient(apiKey, options)]));
    }

    public hasClient(identifier: ClientIdentifier): boolean {
        return this.clients.has(identifier);
    }

    public setClient(identifier: ClientIdentifier, client: SchemaClient) {
        this.clients.set(identifier, client);
    }

    public getClient(identifier: ClientIdentifier): SchemaClient {
        const client = this.clients.get(identifier);
        if (client == null) {
            throw new RangeError();
        }

        return client;
    }

    public deleteClient(identifier: ClientIdentifier): boolean {
        return this.clients.delete(identifier);
    }

    public getClients(): SchemaClient[] {
        const values = this.clients.values();
        return Array.from(values);
    }

    public hasSchema(identifier: SchemaIdentifier): boolean {
        return this.schemas.has(identifier);
    }

    public setSchema(identifier: SchemaIdentifier, schema: ItemSchema) {
        this.schemas.set(identifier, schema);
    }

    public getSchema(identifier: SchemaIdentifier): ItemSchema {
        const schema = this.schemas.get(identifier);
        if (schema == null) {
            throw new RangeError();
        }

        return schema;
    }

    public deleteSchema(identifier: SchemaIdentifier): boolean {
        return this.schemas.delete(identifier);
    }

    public getSchemas(): ItemSchema[] {
        const values = this.schemas.values();
        return Array.from(values);
    }
}
