import SchemaClient from "../src/classes/client";

const client = new SchemaClient(process.env.STEAM_WEB_API_KEY!);

(async() => {
    try {
        const result = await client.getItemSchema();
        await result.export("./test/static", "schema");
        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
})();
