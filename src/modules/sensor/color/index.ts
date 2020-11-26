import { Sensor, SensorArrayValueType } from '../';

/**
 * @type ColorSensorValueType
 */
type ColorSensorValueType = SensorArrayValueType<number>;

/**
 * @type ColorSensorType
 */
type ColorSensorType = {
    id: number;
    value: ColorSensorValueType;
    updated: number;
};

/**
 * @class ColorSensor
 */
class ColorSensor extends Sensor {
    /**
     * ColorSensor constructor
     * @param {number} id robot id
     * @param {ColorSensorValueType} values color sensor values
     */
    constructor(id: number, values?: ColorSensorValueType) {
        super(id, values);
        if (values !== undefined) {
            this._value = values;
        } else {
            this._value = [0, 0, 0];
        }
    }

    /**
     * @override ColorSensor Values
     */
    get values(): ColorSensorValueType {
        return this._value;
    }

    /**
     * method for setting the solor sensor data and get back the updated data
     * @param {ColorSensorValueType} value color sensor value
     */
    syncReading = (value: ColorSensorValueType) => {
        this.setReading(value);
        // TODO: did some process to sync the value with virtual robots
        // Currently just echo back the readings
        return this.values;
    };
}

export { ColorSensor, ColorSensorValueType, ColorSensorType };
