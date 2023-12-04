import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { PixelGridService } from './app.service';
import { PointDto } from './dto/PointDto';
import { Admin, Kafka } from 'kafkajs';
import { ClientKafka } from '@nestjs/microservices';

@Controller('pixel-grids')
export class PixelGridController {
  private admin: Admin;
  constructor(
    @Inject('GRIDS_SERVICE') private client: ClientKafka,
    private readonly pixelGridsService: PixelGridService,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('fibo');
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['kafka:9092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();

    const topicList = [];
    if (!topics.includes('fibo')) {
      topicList.push({
        topic: 'fibo',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (!topics.includes('fibo.reply')) {
      topicList.push({
        topic: 'fibo.reply',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }

  @Get()
  getPixelGrids(): string[] {
    return this.pixelGridsService.getPixelGrids();
  }

  private getFiboResult() {
    return new Promise<number>((resolve) => {
      this.client
        .send('fibo', JSON.stringify({ num: 40 }))
        .subscribe((result: number) => {
          resolve(result);
        });
    });
  }

  @Get(':gridId')
  async getPixelGridState(@Param('gridId') gridId: string): Promise<number> {
    Logger.log(gridId);
    return await this.getFiboResult();
  }

  @Post(':gridId/color-pixel/:color')
  setColorForPixelInGrid(
    @Param('gridId') gridId: string,
    @Param('color') color: string,
    @Body() point: PointDto,
  ): number {
    Logger.log(gridId);
    Logger.log(color);
    Logger.log(point);
    return 0;
  }
}
