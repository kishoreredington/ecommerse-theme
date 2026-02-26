import jwt from "jsonwebtoken";
export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = decoded.UserInfo; // attach user info to request
        next();
    });
};
//# sourceMappingURL=middleware.js.map