export interface EntityJson {
  Amount?: number;
  Date?: number;
  Description?: string;
  Id: string;
  IsPrivate?: boolean;
  Name?: string;
}

export interface EntityListJson {
  List: EntityJson[];
}
