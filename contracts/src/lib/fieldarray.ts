import { Field, Struct, Circuit } from "snarkyjs";

export { FieldArray };

function FieldArray(maxLength: number) {

  return class _FieldArray_ extends Struct({
    length: Field,
    values: Circuit.array(Field, maxLength)
  }){

    constructor(values?: any[]) {
      super({
        values: fillWithNull(values || [], maxLength),
        length: values === undefined ? Field(0) : Field(values.length),
      });
    }  

    set(index: Field, value: Field) {
      this.values[parseInt(index.toString())] = value;
    }

    toFields(): Field[] {
      let ArrayClass = FieldArray(parseInt(this.length.toString()));
      let arr = new ArrayClass(this.values);
      return arr.values;
    }
  };
}

function fillWithNull(values: any[], maxLength: number): Field[] {
  let fields: Field[] = [];
  for (let i = 0; i < values.length; i++) {
    fields[i] = Field(values[i]);
  }
  for (let i = values.length; i < maxLength; i++) {
    fields[i] = Field(0);
  }
  return fields;
}
