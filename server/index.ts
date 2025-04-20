import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config, isDevelopment } from "./config";

const app = express();
app.use(express.json({ limit: config.REQUEST_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: config.REQUEST_SIZE_LIMIT }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

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
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Configurer Vite en mode développement ou servir des fichiers statiques en production
  // La configuration se fait après les autres routes pour éviter les conflits
  if (isDevelopment()) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Utiliser le port configuré (par défaut 5000)
  // Le serveur gère à la fois l'API et le client
  const port = config.PORT;
  const host = process.platform === 'win32' ? 'localhost' : '0.0.0.0';
  
  // Windows ne supporte pas certaines options comme reusePort
  const options = process.platform === 'win32' 
    ? { port, host } 
    : { port, host, reusePort: true };

  server.listen(options, () => {
    log(`Serveur démarré sur http://localhost:${port}`);
    log(`Environnement: ${config.NODE_ENV}`);
  });
})();
