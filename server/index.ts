import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config, isDevelopment } from "./config";

const app = express();

app.use(express.json({ limit: config.REQUEST_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: config.REQUEST_SIZE_LIMIT }));

// Middleware pour logger les requêtes /api
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(app);

  // Gestion globale des erreurs
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Vite pour dev, fichiers statiques pour prod
  if (isDevelopment()) {
    await setupVite(app);
  } else {
    serveStatic(app);
  }

  // Démarrage du serveur
  const port = config.PORT;
  const host = process.platform === 'win32' ? 'localhost' : '0.0.0.0';

  app.listen(port, host, () => {
    log(`✅ Serveur démarré sur http://${host}:${port}`);
    log(`🌍 Environnement: ${config.NODE_ENV}`);
  });
})();
