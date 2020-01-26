import Vue from 'vue'

export function mapPropsModels(props: string[] = [], { object, event }: any = {}) {
  return props.reduce((obj, prop) => {
    const computedProp = {
      get() {
        return object ? this[object][prop] : this[prop];
      },
      set(value) {
        Vue.set(this[object], prop, value);
      }
    };
    obj[prop] = computedProp;
    return obj;
  }, {});
}


export function mapPropsFloatModels(props: string[] = [], { object, event }: any = {}) {
  return props.reduce((obj, prop) => {
    const computedProp = {
      get() {
        return object ? this[object][prop] : this[prop];
      },
      set(value: string) {
        const floatValue = parseFloat(value)
        const limitDecimal = floatValue.toFixed(2)
        const formattedValue = parseFloat(limitDecimal)
        Vue.set(this[object], prop, formattedValue);
      }
    };
    obj[prop] = computedProp;
    return obj;
  }, {});
}