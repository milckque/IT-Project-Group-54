import express from "express"
import buyingGroupRoutes from "./buyingGroupRoutes.ts"
import offerRoutes from "./offerRoutes.ts"
const router = express.Router();

router.use("/buyingGroups", buyingGroupRoutes);
router.use("/offers", offerRoutes);

export default router;

