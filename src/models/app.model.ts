import {Entity, model, property} from '@loopback/repository';
import * as uuid from 'uuid/v4';

@model()
export class App extends Entity {
  @property({
    type: 'string',
    id: true,
    default: uuid()
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  appId: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<App>) {
    super(data);
  }
}
