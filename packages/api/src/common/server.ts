import express, {
  Application,
  Response as ExResponse,
  Request as ExRequest,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';

import errorHandler from '../middlewares/error.handler';

import { RegisterRoutes } from '../../generated/routes';

const app = express();

export default class ExpressServer {
  private routes: (app: Application) => void;

  constructor() {
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));

    app.use(
      '/api-docs',
      swaggerUi.serve,
      async (_req: ExRequest, res: ExResponse) => {
        return res.send(
          swaggerUi.generateHTML(await import('../../generated/swagger.json'))
        );
      }
    );
  }

  router(): ExpressServer {
    RegisterRoutes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
