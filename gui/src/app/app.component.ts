import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PixelGridComponent } from './pixel-grid/pixel-grid.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PixelGridComponent, ColorPickerModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gui';
  color: string = '#000000';

  private subscription: Subscription |undefined = undefined;
  topicname: string = "";
  msg: string = "";
  isConnected: boolean = false;

  constructor(private _mqttService: MqttService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  subscribeNewTopic(): void {
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message.payload.toString()+1;
      console.log('msg: ', message)
    });
    console.log('subscribed to topic: ' + this.topicname)
  }

  sendmsg(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
    this.msg = ''
  }
}
