import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new OAuth2Client(
    process.env.VITE_GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    // console.log("Token", token);

    if (!token) {
        return res.status(401).json({ error: "Unauthorized", redirect: "/login" });
    }

    try {
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: token,
            audience: process.env.VITE_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        req.user = payload;
        next();
    } catch (error) {
        console.log("Authentication error", error);
        res.status(401).json({ error: "Unauthorized", redirect: "/login" });
    }
};