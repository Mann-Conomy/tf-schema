import { HttpStatusCodes } from "../resources/emums";

export default class SteamErrorFactory {
    public static async fromResponse(response: Response) {
        const message = await response.text();

        switch (response.status) {
            case HttpStatusCodes.Forbidden:
            case HttpStatusCodes.Unauthorized:
                return new Error("Access is denied. Retrying will not help. Please verify your API key.");
            default:
                return new Error("Unkown error", { cause: message});
        }
    }
}
