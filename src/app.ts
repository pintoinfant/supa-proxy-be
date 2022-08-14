// import express, { Application, Response, Request } from "express";
// const app: Application = express();

// import * as dotenv from "dotenv";
// dotenv.config();

// const PORT = process.env.PORT;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req: Request, res: Response) => {
//   res.json({
//     success: true,
//     message: "Hello World",
//   });
// });

// app.all("/:slug/*", async (req: Request, res: Response) => {
//   res.json({
//     success: false,
//     slug: req.params.slug,
//     method: req.method,
//     route: req.originalUrl,
//     ip: req.ip,
//   });
// });

// app.listen(PORT, (): void => {
//   console.log(`Server is running on port ${PORT}`);
// });
