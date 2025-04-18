import SteamClient from "../src/classes";

const client = new SteamClient(process.env.STEAM_WEB_API_KEY!);

(async() => {
    try {
        const result = await client.getSchemaOverview();
        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
})();
