import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PixelGridService } from './pixel-grid.service';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt.hostname,
  port: environment.mqtt.port,
  path: '/ws',
  protocol: 'ws'
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    FormsModule,
    importProvidersFrom(HttpClientModule),
    PixelGridService,
    importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS))
  ]
};
