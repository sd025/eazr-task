import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	// res.cookie("jwt", token, {
	// 	httpOnly: true,
	// 	maxAge: 15 * 24 * 60 * 60 * 1000,
	// 	sameSite: "strict",
	// });

	return token;
};

export default generateTokenAndSetCookie;
