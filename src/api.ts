import * as cors from "cors";
import * as nocache from "nocache";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import apiV1 from "./api-v1/index";
import * as errorHandler from "./helpers/errorHandler";
import home from "./home";
import rateLimit from "express-rate-limit";
import { supabaseLog } from "./helpers/supabaseLog";

class App {
  public express: express.Application;

  apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      success: false,
      message: "Too many requests from this IP, please try again after an hour",
    },
  });

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(nocache());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(express.static("public"));
    this.express.use(supabaseLog);
    this.express.use(this.apiLimiter);
  }

  private setRoutes(): void {
    this.express.use("/", home);
    this.express.use("/v1", apiV1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;
