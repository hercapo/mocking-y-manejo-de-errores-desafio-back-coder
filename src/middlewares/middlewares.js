export const isConnected = (req, res, next) => {
    if(req.session.user) return res.redirect("/api/products")
    next();
}

export const isDisconnected = (req, res, next) => {
    if(!req.session.user) return res.redirect("/login")
    next();
}

export const isAdmin = (req, res, next) => {
    if(req?.session?.user?.role !== "Admin") return res.status(401).send({error: "Unauthorized"})
    next();
}

export const isUser = (req, res, next) => {
    console.log("soy user", req.session.user);
    if (!req?.session?.user?.role) {
        return res.redirect("/login");
    } else if (req?.session?.user?.role !== "Usuario") {
        return res.redirect("/register");
    }
    next();
}

export const isUserAvailableToAddToCart = (req, res, next) => {
    console.log("soy user", req.session.user);
    if(req?.session?.user?.role !== "Usuario") return res.send({error: "You must be an user to add products to cart."})
    next();
}