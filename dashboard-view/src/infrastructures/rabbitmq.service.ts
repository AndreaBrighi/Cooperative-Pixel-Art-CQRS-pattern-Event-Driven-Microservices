import { Injectable } from '@nestjs/common';
import { DashboardRepository } from 'src/core/pixel-grids-repository';
import { connect, Connection } from 'amqplib/callback_api';
import { ColorPixelEvent } from 'src/core/ColorPixelEvent';

@Injectable()
export class PixelGridsService implements DashboardRepository {
  private client: (topic: string, message: string) => void;

  constructor() {
    const createMQProducer = (amqpUrl: string, queueName: string) => {
      console.log('Connecting to RabbitMQ...');
      let ch: any;
      connect(amqpUrl, (errorConnect: Error, connection: Connection) => {
        if (errorConnect) {
          console.log('Error connecting to RabbitMQ: ', errorConnect);
          return;
        }

        connection.createChannel((errorChannel, channel) => {
          if (errorChannel) {
            console.log('Error creating channel: ', errorChannel);
            return;
          }

          ch = channel;
          console.log('Connected to RabbitMQ');
        });
      });
      return (topic: string, msg: string) => {
        console.log('Produce message to RabbitMQ...');
        ch.assertExchange(queueName, 'topic', {
          durable: false,
        });
        ch.publish(queueName, topic, Buffer.from(msg));
        //ch.sendToQueue(queueName, Buffer.from(msg));
      };
    };
    this.client = createMQProducer('amqp://rabbitmq:5672', 'dashboard');
  }

  updateGrid(grid: string, event: ColorPixelEvent) {
    this.client(grid, JSON.stringify(event));
  }
}
