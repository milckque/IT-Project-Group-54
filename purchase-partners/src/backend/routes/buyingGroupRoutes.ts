import express from "express";
import {
    getBuyingGroups,
    getBuyingGroupInfo,
    createBuyingGroup,
    joinBuyingGroup,
    leaveBuyingGroup
} from "../controllers/buyingGroupController.ts";

const router = express.Router();

router.get("/", getBuyingGroups);
router.get("/:id", getBuyingGroupInfo);
router.post("/create", createBuyingGroup);
router.post("/join/:group_id", joinBuyingGroup);
router.delete("/leave/:group_id", leaveBuyingGroup);
