import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';
import * as database from '@src/database';

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
    this.addControllers([forecastController]);
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
