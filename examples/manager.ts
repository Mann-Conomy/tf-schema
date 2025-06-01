import { SchemaManager } from "../src/classes";

const manager = new SchemaManager("0C42985A14A820A9E1CE3B8605C5E0BE", [{
    identifier: "test",
}]);


console.log(manager.toJSON().clients);