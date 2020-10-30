export class NetworkError extends Error{
    constructor() {
        super("Unexpected network error");
    }
}