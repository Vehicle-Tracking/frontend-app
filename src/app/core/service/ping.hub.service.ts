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

import { GlobalConfig } from '../../shared/app.constants';
import { VehicleStatus } from '../../model/vehicel.status.model';

export class PingHubService {
  messageReceived = new Subject<VehicleStatus>();
  connectionEstablished = new Subject<Boolean>();
  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private createConnection() {
    const url = GlobalConfig.baseUrl.server + 'pingHub';
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(url)
      .build();
  }

  private startConnection(): any {
    this.hubConnection
      .start()
      .then(() => {
        console.log('pingHub connection started');
        this.connectionEstablished.next(true);
      })
      .catch(err => {
        console.log(`Error while establishing connection, retrying... => ${err}`);
        //     setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('statusRecieved', (data: VehicleStatus) => {
      this.messageReceived.next(data);
    });
  }
}
