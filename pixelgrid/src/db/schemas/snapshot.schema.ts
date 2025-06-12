import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SnapshotDocument = HydratedDocument<Snapshot>;
@Schema()
export class Snapshot {
  @Prop({ required: true })
  gridName: string;
  @Prop([[String]])
  grid: string[][];
  @Prop({ required: true })
  time: Date;
}

export const SnapshotSchema = SchemaFactory.createForClass(Snapshot);
