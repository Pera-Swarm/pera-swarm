import { ColorSensor } from './color';
import { DistanceSensor } from './distance';

/**
 * @type SensorValueType
 */
type SensorValueType<T> = T;

/**
 * @type SensorArrayValueType
 */
type SensorArrayValueType<T> = T[];

/**
 * @type ValueType
 */
type ValueType =
    | SensorValueType<number>
    | SensorValueType<string>
    | SensorArrayValueType<number>
    | SensorArrayValueType<string>;

/**
 * @type SensorType
 */
type SensorType = {
    id: number;
    value: ValueType;
    updated: number;
};

/**
 * @abstract
 * @class Sensor
 */
abstract class Sensor {
    protected _id: number;
    protected _value: ValueType;
    protected _updated: number;

    constructor(id: number, value?: ValueType | undefined) {
        this._id = id;
        if (value !== undefined) {
            this._value = value;
        } else {
            this._value = 0;
        }
        this._updated = Date.now();
    }

    /**
     * the coordinate id
     */
    get id() {
        return this._id;
    }

    /**
     * @abstract sensor values
     */
    abstract get values(): ValueType;

    /**
     * method for getting sensor readings
     */
    getReading(): SensorType {
        return {
            id: this.id,
            value: this.values,
            updated: this._updated
        };
    }

    /**
     * method for setting sesnor readings
     */
    setReading(value: ValueType) {
        this._value = value;
        this._updated = Date.now();
    }
}

/**
 * method for creating the sensor array
 * @param {number} id robot id
 */
const sensors = (id: number) => {
    if (id === undefined) throw new TypeError('id unspecified');
    return {
        color: new ColorSensor(id),
        distance: new DistanceSensor(id),
        updated: new Date()
    };
};

export { sensors, Sensor, SensorType, SensorValueType, SensorArrayValueType };