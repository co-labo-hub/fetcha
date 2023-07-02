type Primitive = boolean | number | string | null;

type JsonArray = Primitive[] | JsonObject[];

type JsonObject = {
  [key: string]: Primitive | JsonObject | JsonArray;
};

export type Json = Primitive | JsonArray | JsonObject;
