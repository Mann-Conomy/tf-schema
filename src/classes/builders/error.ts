import { ErrorCauseFactory } from "../factory";

/**
 * 
 */
export interface ErrorCause {
    cause: {
        body: string;
        status: number;
        statusText: string;
    }
}

/**
 * 
 */
export class SteamError extends Error {
    /**
     * 
     * @param message 
     * @param cause 
     */
    public constructor(message: string, cause: ErrorCause) {
        super(message, cause);
    }
}

/**
 * 
 */
export class SteamErrorBuilder {
    private readonly cause: ErrorCause;

    /**
     * 
     * @param cause 
     */
    public constructor(cause: ErrorCause) {
        this.cause = cause;
    }

    /**
     * 
     * @param message 
     * @returns 
     */
    public build(message: string): SteamError {
        return new SteamError(message, this.cause);
    }

    /**
     * 
     * @param response 
     * @returns 
     */
    public static async fromResponse(response: Response): Promise<SteamErrorBuilder> {
        const cause = await ErrorCauseFactory.fromResponse(response);
        return new SteamErrorBuilder(cause);
    }
}