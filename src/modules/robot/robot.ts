import { Coordinate, CoordinateType, CoordinateValueType } from '../coordinate';
import {
    SensorModuleType,
    sensorModuleTypes,
    sensors as newSensors,
    SensorsType
} from '../sensor';
import { Robot } from '.';

/**
 * @type RobotType
 */
type RobotType = {};

/**
 * @class Robot Representation
 * @classdesc Virtual Robot Specific implementation
 */
class VRobot extends Robot<
    number,
    CoordinateType<number>,
    CoordinateValueType<number>,
    SensorsType,
    SensorModuleType<number[], number>
> {
    protected _created: Date;
    protected _timestamp: number;

    /**
     * Robot constructor
     * @param {number} id robot id
     * @param {CoordinateType<number>} coordinates coordinates
     * @param {SensorsType} sensors sensor array
     */
    constructor(id: number, coordinates?: CoordinateType<number>, sensors?: SensorsType) {
        super(
            id,
            coordinates === undefined ? new Coordinate(id, 0, 0, 0) : coordinates,
            sensors === undefined ? newSensors(id) : sensors
        );
        this._created = new Date();
        this._timestamp = Date.now();
    }

    /**
     * get coordinates
     * @returns {CoordinateValueType<number>} coordinate values
     */
    get coordinates(): CoordinateValueType<number> {
        return this._coordinates.values;
    }

    /**
     * set coordinates
     * @param {CoordinateValueType<number>} CoordinateValueType<T> coordinate values
     */
    setCoordinates(coordinates: CoordinateValueType<number>): void {
        const { heading, x, y } = coordinates;
        this._coordinates.setCoordinates(heading, x, y);
        this._updated = Date.now();
    }

    get sensors(): SensorModuleType<number[], number> {
        throw new Error('Method not implemented.');
    }

    setSensors(sensors: SensorModuleType<number[], number>): void {
        throw new Error('Method not implemented.');
    }

    /**
     * method for getting all the sensor readings
     * @returns {object} all sensor readings with sensor type as the key and readings as the value
     */
    getSensorReadings = () => {
        var result = {};
        for (const key in this._sensors) {
            if (this._sensors.hasOwnProperty(key)) {
                if (sensorModuleTypes.color === key) {
                    result[key] = this._sensors[key].getReading();
                }
            }
        }
        return result;
    };

    /**
     * method for getting the sensor readings by the given sensor type
     * @param {string} type sensor type
     * @returns {object} sensor reading object
     */
    getReadingsBySensor = (type: string) => {
        if (typeof type === 'string') {
            return this._sensors[type].getReading();
        } else {
            throw new TypeError('invalid sensor type');
        }
    };
}

export { VRobot, RobotType };
