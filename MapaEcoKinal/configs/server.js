import express from "express";
import recyclingRoutes from "../src/recycling/recycling.routes.js";

export const createApp = () => {
    const app = express();

    app.use(express.json());

    app.use("/api", recyclingRoutes);

    return app;
};