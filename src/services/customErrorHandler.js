class customErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }
    static alreadyExist(message) {
        return new customErrorHandler(409, message);
    }
    static wrongCredentials(message="Your email and password is wrong"){
        return new customErrorHandler(401, message);
    }
    static unAuthorizedUser(message="Unauthorized User") {
        return new customErrorHandler(401, message);
    }
    static notFound(message="404 Not Found") {
        return new CustomErrorHandler(404, message);
    }
    static serverError(message="Internal Server Error") {
        return new CustomErrorHandler(500, message);
    }
}

export default customErrorHandler;