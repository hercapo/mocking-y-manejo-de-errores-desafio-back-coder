// import passport from "passport";
import UserDTO from "../dto/user.dto.js";

export const registerSession = async (req, res) => {
    res.send({ status: "success", message: "User registered" });
};

export const failedRegister = (req, res) => {
    res.status(400).send({ status: "error", error: "Registry fail" });
};

export const loginSession = async (req, res) => {
    if (!req.user)
        return res
            .status(400)
            .send({ status: "error", error: "Incorrect credentials" });
    let user = new UserDTO(req.user);
    console.log("usuario", user);
    req.session.user = user;
    res.send({
        status: "success",
        payload: req.session.user,
        message: "You logged in.",
    });
};

export const failedLogin = (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res
                .status(500)
                .send({ status: "error", error: "Couldn´t logout." });
        }
        res.redirect("/login");
    });
};

export const githubCallback = (req, res) => {
    req.session.user = req.user;
    res.redirect("/current");
};
