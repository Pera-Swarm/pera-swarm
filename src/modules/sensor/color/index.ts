import { Sensor, SensorArrayValueType } from '../';

/**
 * @type ColorSensorValueType
 */
export type ColorSensorValueType = SensorArrayValueType<number>;

/**
 * @type ColorSensorType
 */
export type ColorSensorType = {
    id: number;
    value: ColorSensorValueType;
    updated: number;
};

/**
 * @class ColorSensor
 */
export class ColorSensor<T> extends Sensor<T, ColorSensorValueType> {
    /**
     * ColorSensor constructor
     * @param {T} id robot id
     * @param {ColorSensorValueType} values color sensor values
     */
    constructor(id: T, values?: ColorSensorValueType) {
        super(id, values === undefined ? [0, 0, 0] : values);
    }

    /**
     * @override ColorSensor Values
     */
    get value(): ColorSensorValueType {
        return this._value;
    }

    /**
     * method for setting the solor sensor data and get back the updated data
     * @param {ColorSensorValueType} values color sensor value
     */
    syncReading = (values: ColorSensorValueType) => {
        this.setReading(values);
        // TODO: did some process to sync the value with virtual robots
        // Currently just echo back the readings
        return this.value;
    };
}
