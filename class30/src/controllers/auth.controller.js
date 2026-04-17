export async function registerUser(req, res, next) {
    try {
        throw new Error("Registration failed");

    }
    catch (err) {
        err.status = 400;
        next(err);
    }
}