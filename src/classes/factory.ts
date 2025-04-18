export default class SteamErrorFactory {
    static fromResponse(response: Response, message: string) {
        switch (response.status) {
            default:
                return new Error(message);
        }
    }
}