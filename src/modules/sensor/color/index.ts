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
class ColorSensor extends Sensor<number, ColorSensorValueType> {
    /**
     * ColorSensor constructor
     * @param {number} id robot id
     * @param {ColorSensorValueType} values color sensor values
     */
    constructor(id: number, values?: ColorSensorValueType) {
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

export { ColorSensor, ColorSensorValueType, ColorSensorType };
