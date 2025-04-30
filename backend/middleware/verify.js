import {User} from "../models/user.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'Unauthorized' });
		  }
	  
		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
	  
		req.userId = decoded.userId;      
		req.user = user;

		next();
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

export default protectRoute;
