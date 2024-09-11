import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { FormsModule } from '@angular/forms';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 15675,
  path: '/ws',
  protocol: 'ws'
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    FormsModule,
    importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS))
  ]
};
