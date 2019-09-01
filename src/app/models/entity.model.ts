import { EntityJson } from './entity.interface';

export class Entity {
  amount: number;
  description: string;
  dateTicks: number;
  dateFormatted: any;
  id: string;
  isPrivate: boolean;
  name: string;

  constructor(json?: EntityJson) {
    if (json) {
      this.fromJson(json);
    }
  }

  fromJson(json: EntityJson) {
    this.id = json.Id;
    this.description = json.Description;
    this.dateTicks = json.Date;
    if (json.Date) {
      this.dateFormatted = this.tickToDate(json.Date);
    }
    this.name = json.Name;
    if (json.Amount) {
      this.amount = json.Amount;
    }
    if ('IsPrivate' in json) {
      this.isPrivate = json.IsPrivate;
    }
  }

  toJson(entity: Entity): EntityJson {
    const json: EntityJson = {
      Id: entity.id
    };
    if (entity.name) {
      json.Name = entity.name;
    }
    if (entity.description) {
      json.Description = entity.description;
    }
    if (entity.dateFormatted) {
      json.Date = this.dateToTick(entity.dateFormatted);
    }
    if (entity.amount) {
      json.Amount = entity.amount;
    }
    json.IsPrivate = entity.isPrivate;
    return json;
  }

  /**
   * Convert C#'s ticks to a JavaScript Date object.
   * @param dateTicks Date ticks.
   */
  tickToDate(dateTicks: any) {
    const ticksToMicrotime = dateTicks / 10000;
    const epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
    return new Date(ticksToMicrotime - epochMicrotimeDiff);
  }

  dateToTick(date: Date): number {
    return date.getTime() * 10000 + 621355968000000000;
  }
}
