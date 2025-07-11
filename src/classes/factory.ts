import { HttpStatusCodes } from "../resources/emums";
import { type ErrorCause, SteamErrorBuilder } from "./builders/error";

/**
 * A factory class to create error causes based on HTTP response codes from the Steam Web API.
 */
export class ErrorCauseFactory {
    /**
     * Creates a cause object based on the HTTP response status from a Steam Web API call.
     * @param response The HTTP response received from the Steam API.
     * @returns A Promise that resolves to a cause object.
     */
    public static async fromResponse(response: Response): Promise<ErrorCause> {
        const body = await response.text();

        return {
            cause: {
                body,
                status: response.status,
                statusText: response.statusText,
            }
        };
    }
}

/**
 * A factory class to create errors based on HTTP response codes from the Steam Web API.
 */
export default class SteamErrorFactory {
    /**
     * Creates an Error based on the HTTP response status from a Steam Web API call.
     * @param response The HTTP response received from the Steam API.
     * @returns A Promise that resolves to an Error with a message and cause.
     */
    public static async fromResponse(response: Response) {
        const builder = await SteamErrorBuilder.fromResponse(response);

        switch (response.status) {
            case HttpStatusCodes.BadRequest:
                return builder.build("The request was malformed or invalid. Check the error cause or try again");
            case HttpStatusCodes.BadGateway:
            case HttpStatusCodes.GatewayTimeout:
                return builder.build("Steam servers are currently unavailable or not responding. Please try again later");
            case HttpStatusCodes.RequestTimeout:
                return builder.build("The request timed out. Please try again later");
            case HttpStatusCodes.Forbidden:
            case HttpStatusCodes.Unauthorized:
                return builder.build("Access is denied. Retrying will not help. Please verify your API key");
            case HttpStatusCodes.InternalServerError:
                return builder.build("An unexpected error occurred when communicating with the Steam Web API");
            default:
                return builder.build("Unknown error occurred while processing the Steam API response");
        }
    }
}
