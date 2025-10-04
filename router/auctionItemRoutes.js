import {isAuthenticated, isAuthorized} from "../middlewares/auth.js";

import { addNewAuctionItem, getAllItem, getAuctionDetails, getMyAuctionItems, removeFromAuction, republishItem } from "../controllers/auctionItemController.js";

import express from "express";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";

const router = express.Router();

router.post("/create", isAuthenticated,trackCommissionStatus,isAuthorized("Auctioneer"), addNewAuctionItem);

router.get("/allitems", getAllItem);

router.get("/myitems", isAuthenticated , isAuthorized("Auctioneer"), getMyAuctionItems);

router.get("/auction/:id", isAuthenticated, getAuctionDetails);

router.delete("/delete/:id",isAuthenticated,isAuthorized("Auctioneer"),removeFromAuction);

router.put("/item/republish/:id",isAuthenticated, isAuthorized("Auctioneer"), republishItem);



export default router;