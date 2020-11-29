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
type SensorType<T> = {
    id: T;
    value: ValueType;
    updated: number;
    getReading: Function;
    setReading: Function;
};

/**
 * @type SensorReadingType
 */
type SensorReadingType<T, TValueType> = {
    id: T;
    value: TValueType;
    updated: number;
};

/**
 * @type SensorReadingTypes
 */
type SensorReadingTypes =
    | SensorReadingType<number, number>
    | SensorReadingType<number, number[]>
    | SensorReadingType<string, string>
    | SensorReadingType<string, string[]>;

/**
 * @type SensorModuleType
 */
type SensorModuleType<TColor, TDistance> = {
    color: SensorType<TColor>;
    distance: SensorType<TDistance>;
    updated: number;
};

/**
 * @interface SensorReading
 */
interface SensorReading<T> {
    [key: string]: T;
}

/**
 * @interface SensorModuleType
 */
interface SensorModuleInterface<TColor, TDistance> {
    color: SensorReading<SensorType<TColor>>;
    distance: SensorReading<SensorType<TDistance>>;
    updated: number;
}

/**
 * @type SensorsType
 */
type SensorsType =
    | SensorModuleType<number, number>
    | SensorModuleType<number[], number>
    | SensorModuleType<string, number>
    | SensorModuleType<string[], number>;

/**
 * @abstract
 * @class Sensor
 */
abstract class Sensor<TId, TValueType = ValueType> {
    protected _id: TId;
    protected _value: TValueType;
    protected _updated: number;

    constructor(id: TId, value?: TValueType) {
        this._id = id;
        if (value !== undefined) {
            this._value = value;
        } else {
            throw new Error(
                'Invalid argument. value argument must be one of number, number[] string or string[] types.'
            );
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
     * the coordinate updated
     */
    get updated() {
        return this._id;
    }

    /**
     * @abstract sensor value
     */
    abstract get value(): ValueType;

    /**
     * method for getting sensor readings
     */
    getReading(): SensorReadingType<TId, TValueType> {
        return {
            id: this._id,
            value: this._value,
            updated: this._updated
        };
    }

    /**
     * method for setting sesnor readings
     */
    setReading(value: TValueType) {
        if (value === undefined) {
            throw new TypeError('value is not specified');
        } else {
            this._value = value;
            this._updated = Date.now();
        }
    }
}

/**
 * method for creating the sensor array
 * @param {number} id robot id
 */
function sensors(id: number): SensorsType {
    if (id === undefined) throw new TypeError('id unspecified');
    return {
        color: new ColorSensor(id),
        distance: new DistanceSensor(id),
        updated: Date.now()
    };
}

const sensorModuleTypes: string[] = ['color', 'distance'];

export {
    sensors,
    Sensor,
    SensorType,
    SensorsType,
    SensorValueType,
    SensorArrayValueType,
    SensorModuleType,
    SensorModuleInterface,
    SensorReading,
    SensorReadingType,
    SensorReadingTypes,
    sensorModuleTypes
};
