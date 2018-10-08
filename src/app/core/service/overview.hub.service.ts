import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  JsonHubProtocol,
  LogLevel,
  HttpTransportType,
  IHttpConnectionOptions,
   } from '@aspnet/signalr';
import { Subject } from 'rxjs';

import { VehicleOverView } from '../../model/vehicle.overview.model';
import { GlobalConfig } from '../../shared/app.constants';

export class OverviewHubService {
  messageReceived = new Subject<VehicleOverView>();
  connectionEstablished = new Subject<Boolean>();
  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private createConnection() {
    const url = GlobalConfig.baseUrl.server + 'overviewHub';
    const protocol = new JsonHubProtocol();
    const options: IHttpConnectionOptions = {
       transport: HttpTransportType.WebSockets,
       logger: LogLevel.Trace,
       logMessageContent: true,
       skipNegotiation: false
    };
    this.hubConnection = new HubConnectionBuilder()
 //    .withHubProtocol(protocol)
     .withUrl(url)
 //    .configureLogging(LogLevel.Trace)
 //     .withUrl(url)
      .build();
  }

  private startConnection(): any {
    this.hubConnection
      .start()
      .then(() => {
          console.log('overviewHub connection started');
          this.connectionEstablished.next(true);
      })
      .catch(_ => {
          console.error(`Error while establishing connection, retrying...`);
       //   setTimeout(this.startConnection(), 30000);
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('overviewReceived', (data: VehicleOverView) => {
      this.messageReceived.next(data);
    });
  }
}
