import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PixelGridsUseCases } from '../usecases/pixel-grids.usecases';
//import { Admin, Kafka } from 'kafkajs';
import { PixelDto } from './dto/PixelDto';

@Controller('pixel-grids')
export class GatewayController {
  //private admin: Admin;
  constructor(private readonly pixelGridsUseCase: PixelGridsUseCases) {}

  // async onModuleInit() {
  //   const kafka = new Kafka({
  //     clientId: 'my-app',
  //     brokers: ['kafka:9092'],
  //   });
  //   this.admin = kafka.admin();
  //   const topics = await this.admin.listTopics();

  //   const topicList = [];
  //   if (!topics.includes('colorate_grid')) {
  //     topicList.push({
  //       topic: 'colorate_grid',
  //       numPartitions: 10,
  //       replicationFactor: 1,
  //     });
  //   }

  //   if (!topics.includes('fibo.reply')) {
  //     topicList.push({
  //       topic: 'fibo.reply',
  //       numPartitions: 10,
  //       replicationFactor: 1,
  //     });
  //   }

  //   if (topicList.length) {
  //     await this.admin.createTopics({
  //       topics: topicList,
  //     });
  //   }
  // }

  @Get()
  getPixelGrids(): string[] {
    Logger.log("GET");
    return this.pixelGridsUseCase.getAllGrid();
  }

  @Get(':gridId')
  async getPixelGridState(@Param('gridId') gridId: string) {
    Logger.log("GET "+gridId);
    return this.pixelGridsUseCase.getGridState(gridId);
  }

  @Post(':gridId/color-pixel')
  setColorForPixelInGrid(
    @Param('gridId') gridId: string,
    @Body() pixel: PixelDto,
  ): number {
    Logger.log(gridId);
    Logger.log(pixel.color);
    Logger.log(pixel.point);
    this.pixelGridsUseCase.colorateGrid(gridId);
    return 0;
  }
}
