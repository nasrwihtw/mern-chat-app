import expresse from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controller/user.controller.js";

const router = expresse.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;