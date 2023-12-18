import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PixelGridsUseCases } from '../usecases/pixel-grids.usecases';
import { PointDto } from './dto/PointDto';
import { Admin, Kafka } from 'kafkajs';

@Controller('pixel-grids')
export class GatewayController {
  private admin: Admin;
  constructor(private readonly pixelGridsUseCase: PixelGridsUseCases) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['kafka:9092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();

    const topicList = [];
    if (!topics.includes('colorate_grid')) {
      topicList.push({
        topic: 'colorate_grid',
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
    return this.pixelGridsUseCase.getAllGrid();
  }

  @Get(':gridId')
  async getPixelGridState(@Param('gridId') gridId: string) {
    Logger.log(gridId);
    return this.pixelGridsUseCase.getGridState(gridId);
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
    this.pixelGridsUseCase.colorateGrid(gridId);
    return 0;
  }
}
