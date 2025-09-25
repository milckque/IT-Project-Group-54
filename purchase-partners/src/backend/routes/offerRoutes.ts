import express from "express";
import {
    getOfferInfo,
    createOffer,
    joinOffer,
    leaveOffer
} from "../controllers/offerController.ts"

const router = express.Router();

router.get("/:offer_id", getOfferInfo);
router.post("/:group_id/:price/:min_threshold", createOffer);
router.post("/:offer_id", joinOffer);
router.delete("/:offer_id", leaveOffer);

export default router;
