import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Open Library API Docs",
            version: "1.0.0",
        },
    },
    apis: ["./src/**/routes/*.ts"], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app: Express, port: number) {
    // swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // docs in JSON
    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.info(`Docs available at http://localhost:${port}/docs`);
}
