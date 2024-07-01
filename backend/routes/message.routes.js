import expresse from "express";
import { getMessages, sendMessage } from "../controller/message.conroller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = expresse.Router();

router.get("/:id", protectRoute ,getMessages);
router.post("/send/:id", protectRoute ,sendMessage);
export default router;
