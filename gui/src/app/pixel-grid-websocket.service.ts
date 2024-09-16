import { Injectable } from '@angular/core';
import { json } from 'body-parser';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixelGridWebsocketService {

  private subscriptions: { [key: string]: Subscription } = {};

  constructor(private _mqttService: MqttService) { }

  subscribeNewTopic<T>(topic: string, action: (message:T)=>void): void {
    console.log('inside subscribe new topic')
    this.subscriptions[topic] = this._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      let messageParsed = JSON.parse(message.payload.toString());
      console.log(messageParsed);
      action(messageParsed);
    });
    console.log('subscribed to topic: ' + topic)
  }

  sendmsg<T>(topic: string, message: T): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(topic, JSON.stringify(message), { qos: 1, retain: true })
  }

  unsubscribe(topic: string,): void {
    this.subscriptions[topic]?.unsubscribe();
  }
}
