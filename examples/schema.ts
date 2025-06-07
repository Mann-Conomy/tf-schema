import ItemSchema from "../src/classes/schema";

(async() => {
    try {
        // Import the item schema from a static context
        const schema = await ItemSchema.import("./assets/static/schema.json");

        // Find the name of the item quality with the id of 11
        const name = schema.getQualityNameById(11);
        console.log(name); // Strange
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error importing the item schema", error.message);
        }
    }
})();
