import SchemaClient from "../src/classes/client";

// Create a new SchemaClient instance with your Steam Web API key
const client = new SchemaClient(process.env.STEAM_WEB_API_KEY!);

(async() => {
    try {
        // Fetch the item schema from the Steam Web API
        const schema = await client.getItemSchema();

        // Find the schema item for the Team Captain using its localized name
        const item = schema.getItemByName("Team Captain", true);
        console.log(item?.name, item?.defindex, item?.item_quality); // The Team Captain, 378, 6
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching the item schema", error.message);
        }
    }
})();
