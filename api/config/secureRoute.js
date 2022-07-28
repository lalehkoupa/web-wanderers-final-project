const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const prisma = require("../config/prisma");
const SECRET = "alright then, keep your secrets";


const secureRoute = async(req, res, next) =>
{
	if(req.headers.authorization === "Bearer")
		throw new Error("Woah! You need to Login for that!");
	try
	{
		if(!req.headers.authorization) throw new Error("Missing header");
		const token = req.headers.authorization.replace("Bearer ", "");
		const payload = jwt.verify(token, SECRET);
		const userToVerify = await prisma.user.findById(payload.sub);

		if(!userToVerify) throw new Error("You need to login!");
		req.currentUser = userToVerify;
		next();
	}
	catch (err)
	{
		console.log(err);
		return res.status(401).json({ message: err });
	}
};


const secureRouteAdmin = async(req, res, next) =>
{
	try
	{
		if(req.headers.authorization === "Bearer")
			throw new Error("Woah! You need to Login for that!");
		if(!req.headers.authorization) throw new Error("Missing header");
		const token = req.headers.authorization.replace("Bearer ", "");
		const payload = jwt.verify(token, secret);
		const userToVerify = await prisma.user.findById(payload.sub);

		if(!userToVerify) throw new Error("You need to login!");
		req.currentUser = userToVerify;
		if(userToVerify.isAdmin !== true)
			throw new Error("Woah! You need to be an Admin for that!");
		next();
	}
	catch (err)
	{
		console.log(err);
		return res.status(401).json({ message: err.message });
	}
};

module.exports = {secureRoute,secureRouteAdmin};