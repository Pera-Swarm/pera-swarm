import { Sensor, SensorArrayValueType, SensorValueType } from '../';

/**
 * @type DistanceSensorValueType
 */
type DistanceSensorValueType = SensorArrayValueType<number>;

/**
 * @type DistanceSensorType
 */
type DistanceSensorType = {
    id: number;
    value: DistanceSensorValueType;
    updated: number;
};

/**
 * @class DistanceSensor
 */
class DistanceSensor extends Sensor {
    /**
     * DistanceSensor constructor
     * @param {number} id robot id
     * @param {DistanceSensorValueType} value distance sensor reading
     */
    constructor(id: number, value?: DistanceSensorValueType) {
        super(id, value);
        if (value !== undefined) {
            this._value = value;
        } else {
            this._value = [0, 0, 0];
        }
    }

    /**
     * @override DistanceSensor values
     */
    get values(): DistanceSensorValueType {
        return this._value;
    }

    /**
     * method for setting the distance sensor data and get back the updated data
     * @param {DistanceSensorValueType} value distance sensor value
     */
    syncReading = (value: DistanceSensorValueType) => {
        this.setReading(value);
        // TODO: did some process to sync the value with virtual robots
        // Currently just echo back the readings
        return this.values;
    };
}

export { DistanceSensor, DistanceSensorType, DistanceSensorValueType };
