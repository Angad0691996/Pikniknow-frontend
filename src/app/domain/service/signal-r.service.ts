import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as SignalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  mxChipData: Subject<string> = new Subject();
  private hubConnection: SignalR.HubConnection;

  constructor(private http: HttpClient) {
  }

  private getSignalRConnection(): Observable<any> {
	  debugger
    return this.http.get<any>("http://travelappapi-dev.ap-south-1.elasticbeanstalk.com/eventHub");
  }

  init() {
    this.getSignalRConnection().subscribe(con => {
      const options = {
        accessTokenFactory: () => con.accessToken
      };
      debugger
      let data = options;
      this.hubConnection = new SignalR.HubConnectionBuilder()
        .withUrl(con.url, options)
        .configureLogging(SignalR.LogLevel.Information)
        .build();
      this.hubConnection.on('story', data => {
        this.mxChipData.next(data);
      });

      this.hubConnection.start()
        .catch(error => console.error(error));

      this.hubConnection.serverTimeoutInMilliseconds = 300000;
      this.hubConnection.keepAliveIntervalInMilliseconds = 300000;

      this.hubConnection.onclose((error) => {
		  debugger
        this.hubConnection.start();
        console.error(`Something went wrong: ${error}`);
      });
    });
  }

  start() {
    this.hubConnection = new SignalR.HubConnectionBuilder().withUrl("http://travelappapi-dev.ap-south-1.elasticbeanstalk.com/eventHub").build()
    this.hubConnection.start().then(data => console.log("hello")).catch(data => console.log("error"));
    this.getData();
  }

  getData() {
    this.hubConnection.on("StoryComment", (data) => {
      debugger
    })
  }
}
