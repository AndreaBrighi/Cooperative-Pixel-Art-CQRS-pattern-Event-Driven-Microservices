import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { number } from 'zod';

export type EventDocument = HydratedDocument<Event>;
@Schema()
export class Event {
  @Prop({ required: true })
  gridName: string;
  @Prop()
  color: string;
  @Prop(
    raw({
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    }),
  )
  point: Record<number, any>;
  @Prop({ required: true })
  time: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
