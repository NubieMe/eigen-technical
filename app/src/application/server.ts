import express from "express";
import swaggerDocs from "../docs/swagger";
import { routes } from "./routes/routes";
import { errorHandler } from "./middleware/error-handler";

export const app = express();
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const port = Number(process.env.PORT);

export const server = app.listen(process.env.PORT, async () => {
    console.log(`Server is running at http://localhost:${port}`);

    swaggerDocs(app, port);
});
