// import { config } from "dotenv";
// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import { connection } from "./database/connection.js";
// import userRouter from "./router/userRoutes.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import auctionItemRouter from "./router/auctionItemRoutes.js";
// import bidRouter from "./router/bidRoutes.js";
// import commissionRouter from "./router/commissionRouter.js"
// import superAdminRouter from "./router/superAdminRoutes.js"
// import { endedAuctionCron } from "./automation/endedAuctionCron.js";
// import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";
 
// const app = express();
// config({
//     path:"./config/config.env"
// });
// console.log("Loaded MONGO_URI =", process.env.MONGO_URI);


// app.use(cors( {
//     origin: [process.env.FRONTEND_URL],
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials:true,
// })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:"/tmp/",
//      parseNested: true,  /////my changes
// })
// );
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/auctionitem", auctionItemRouter);
// app.use("/api/v1/bid", bidRouter);
// app.use("/api/v1/commission", commissionRouter);
// app.use("/api/v1/superadmin", superAdminRouter);


// endedAuctionCron();
// verifyCommissionCron();
// connection();
// app.use(errorMiddleware);


// export default app;

import express from "express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { connection } from "./database/connection.js";
import userRouter from "./router/userRoutes.js";
import { errorMiddleware } from "./middlewares/error.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import commissionRouter from "./router/commissionRouter.js";
import superAdminRouter from "./router/superAdminRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

// ✅ Fix: Load .env using absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
  path: path.join(__dirname, "config", "config.env"),
});

console.log("✅ Loaded MONGO_URI =", process.env.MONGO_URI);
console.log("✅ Loaded FRONTEND_URL =", process.env.FRONTEND_URL);
console.log("✅ Loaded PORT =", process.env.PORT);

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    parseNested: true, // your custom change
  })
);

// ✅ API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

// ✅ Cron jobs
endedAuctionCron();
verifyCommissionCron();

// ✅ Database connection
connection();

// ✅ Error middleware
app.use(errorMiddleware);

export default app;

