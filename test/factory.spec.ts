import { describe, expect, test } from "@jest/globals";
import SteamErrorFactory from "../src/classes/factory";
import { HttpStatusCodes } from "../src/resources/emums";

describe("SteamErrorFactory", () => {
    test("should return a custom error message for 502 Bad gateway", async() => {
        // Arrange
        const response = createResponse(HttpStatusCodes.BadGateway);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("Steam servers are currently unavailable or not responding. Please try again later");
    });

    test("should return a custom error message for 504 Gateway timeout", async() => {
        // Arrange
        const response = createResponse(HttpStatusCodes.GatewayTimeout);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("Steam servers are currently unavailable or not responding. Please try again later");
    });

    test("should return a custom error message for 400 Bad request", async() => {
        // Arrange
        const response = createResponse(HttpStatusCodes.BadRequest);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("The request was malformed or invalid. Check the error cause or try again");
    });

    test("should return a custom error message for 408 Request timeout", async() => {
        // Arrange
        const response = createResponse(HttpStatusCodes.RequestTimeout);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("The request timed out. Please try again later");
    });

    test("should return a custom error message for 403 Forbidden", async() => {
        // Arrange
        const response = createResponse(HttpStatusCodes.Forbidden);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("Access is denied. Retrying will not help. Please verify your API key");
    });

    test("should return a custom error message for 401 Unauthorized", async() => {
        // Arrange
        const response = createResponse(HttpStatusCodes.Unauthorized);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("Access is denied. Retrying will not help. Please verify your API key");
    });

    test("should return a custom error message for 500 Interal server error", async() => {
        // Arrange
        const response = createResponse(HttpStatusCodes.InternalServerError);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("An unexpected error occurred when communicating with the Steam Web API");
    });

    test("should return a generic error message for 418 I'm a teapot", async() => {
        // Arrange
        const response = createResponse(418);

        // Act
        const error = await SteamErrorFactory.fromResponse(response);

        // Assert
        expect(error.message).toBe("Unknown error occurred while processing the Steam API response");
    });
});

/**
 * Creates a Response object with the specified HTTP status code.
 * @param status The HTTP status code to be used in the Response.
 * @returns A sample Response object with the specified HTTP status code.
 */
function createResponse(status: number): Response {
    return new Response("Response from the Steam Web API", {
        status
    });
}
