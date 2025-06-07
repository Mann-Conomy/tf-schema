/**
 * String seperators for creating URLs and saving files.
 */
export enum StringSeperators {
    Punctuation = ".",
    ForwardSlash = "/"
}

/**
 * File extensions used for exporting the item schema.
 */
export enum FileExtension {
    JSON = "json"
}

/**
 * HTTP status codes used by the Steam Web API.
 */
export enum HttpStatusCodes {
    Forbidden = 403,
    BadRequest = 400,
    RequestTimeout = 408,
    Unauthorized = 401,
    GatewayTimeout = 504,
    BadGateway = 502,
    InternalServerError = 500
}
