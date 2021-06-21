import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';
import * as database from '@src/database';
import { BeachesController } from './controllers/beaches';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase();
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening on port:', this.port);
    });
  }

  public async close(): Promise<void> {
    try {
      await database.close();
      console.log('Mongodb successfully disconnected');
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // private setups
  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    this.addControllers([forecastController, beachesController]);
  }

  private async setupDatabase(): Promise<void> {
    try {
      await database.connect();
      console.log('Mongodb successfully connected');
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
