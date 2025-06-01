import SchemaClient from "./client";
import type ItemSchema from "./schema";
import type { SchemaOptions } from "../types/schema";
import { exportFile, importFile } from "../lib/utils";

export type SchemaIdentifier = string | number;
export type ClientIdentifier = string | number;

export interface SchemaManagerOptions extends Partial<SchemaOptions> {
    identifier: ClientIdentifier;
}

export interface ManagerProperties {
    schemas: [SchemaIdentifier, ItemSchema][];
    clients: [ClientIdentifier, SchemaClient][];
}

export default class SchemaManager {
    private readonly schemas: Map<SchemaIdentifier, ItemSchema>;
    private readonly clients: Map<ClientIdentifier, SchemaClient>;

    constructor(apiKey: string, clients: SchemaManagerOptions[]) {
        this.schemas = new Map();
        this.clients = new Map(clients.map(options => [options.identifier, new SchemaClient(apiKey, options)]));
    }

    public hasClient(identifier: ClientIdentifier): boolean {
        return this.clients.has(identifier);
    }

    public setClient(identifier: ClientIdentifier, client: SchemaClient) {
        this.clients.set(identifier, client);
    }

    public updateClient(identifier: ClientIdentifier, apiKey: string, options: Partial<SchemaOptions>) {
        const client = new SchemaClient(apiKey, options);
        this.setClient(identifier, client);
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

    public getSchemaClients(): Map<ClientIdentifier, SchemaClient> {
        return this.clients;
    }

    public hasSchema(identifier: SchemaIdentifier): boolean {
        return this.schemas.has(identifier);
    }

    public setSchema(identifier: SchemaIdentifier, schema: ItemSchema) {
        this.schemas.set(identifier, schema);
    }

    public async updateSchema(identifier: SchemaIdentifier) {
        const schema = await this.getClient(identifier).getItemSchema();
        this.setSchema(identifier, schema);
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

    public getItemSchemas(): Map<SchemaIdentifier, ItemSchema> {
        return this.schemas;
    }

    public toJSON(): ManagerProperties {
        const schemas = this.getItemSchemas().entries();
        const clients = this.getSchemaClients().entries();

        return {
            schemas: Array.from(schemas),
            clients: Array.from(clients)
        };
    }

    public stringify(): string {
        const manager = this.toJSON();
        return JSON.stringify(manager);
    }

    public async export(directory: string, filename: string, encoding: BufferEncoding = "utf8"): Promise<string> {
        const manager = this.stringify();
        return await exportFile(directory, filename, manager, encoding);
    }

    public async import(path: string, encoding: BufferEncoding = "utf8"): Promise<SchemaManager> {
        const manager = await importFile<ManagerProperties>(path, encoding);
        manager.schemas.forEach(([key, schema]) => this.schemas.set(key, schema));
        manager.clients.forEach(([key, client]) => this.clients.set(key, client));
        return this;
    }
}
