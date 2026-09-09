import { config } from "dotenv";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import userRouter from "./router/userRoutes.js";
import { errorMiddleware } from "./middlewares/error.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import commissionRouter from "./router/commissionRouter.js"
import superAdminRouter from "./router/superAdminRoutes.js"
import aiRouter from "./router/aiRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

const app = express();
config({
    path: "./config/config.env"
});
// Fallback if root .env exists
config();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (
            origin === process.env.FRONTEND_URL ||
            origin.endsWith(".vercel.app") ||
            origin.includes("localhost") ||
            origin.includes("127.0.0.1")
        ) {
            return callback(null, true);
        }
        return callback(new Error("Blocked by CORS"));
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
     parseNested: true,  /////my changes
})
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);
app.use("/api/v1/ai", aiRouter);


 endedAuctionCron();
 verifyCommissionCron();
connection();
app.use(errorMiddleware);


export default app;
