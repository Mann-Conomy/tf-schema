import { ErrorCauseFactory } from "../factory";

/**
 * Represents the structure of an error cause object.
 */
export interface ErrorCause {
    cause: {
        /** The body of the error response as a string. */
        body: string;
        /** The HTTP status code associated with the error. */
        status: number;
        /** The status text (e.g., "Not Found", "Internal Server Error"). */
        statusText: string;
    }
}

/**
 *  A custom error class for handling Steam Web API-related errors.
 */
export class SteamError extends Error {
    /**
     * Creates a new instance of SteamError.
     * @param message The error message.
     * @param cause The cause of the error, including HTTP details.
     */
    public constructor(message: string, cause: ErrorCause) {
        super(message, cause);
    }
}

/**
 * A builder class for creating instances of `SteamError` from various sources.
 */
export class SteamErrorBuilder {
    private readonly cause: ErrorCause;

    /**
     * Constructs a new `SteamErrorBuilder` with the given error cause.
     * @param cause The structured cause of the error.
     */
    public constructor(cause: ErrorCause) {
        this.cause = cause;
    }

    /**
     * Builds a `SteamError` with the provided message and cause.
     * @param message The error message.
     * @returns A new instance of `SteamError`.
     */
    public build(message: string): SteamError {
        return new SteamError(message, this.cause);
    }

    /**
     * Creates a `SteamErrorBuilder` by extracting error cause information the `Response` object.
     * @param response The `Response` object from a failed HTTP request.
     * @returns A promise that resolves to an instance of `SteamErrorBuilder`.
     */
    public static async fromResponse(response: Response): Promise<SteamErrorBuilder> {
        const cause = await ErrorCauseFactory.fromResponse(response);
        return new SteamErrorBuilder(cause);
    }
}
