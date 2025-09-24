import express from "express"
import buyingGroupRoutes from "buyingGroupRoutes"

const router = express.Router();

router.use("/buyingGroups", buyingGroupRoutes);

