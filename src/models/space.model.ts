import {Entity, model, property} from '@loopback/repository';
import * as uuid from 'uuid/v4';

@model()
export class Space extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid()
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Space>) {
    super(data);
  }
}
