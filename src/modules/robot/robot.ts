import { Coordinate, CoordinateType, CoordinateValueType } from '../coordinate/';
import {
    SensorModuleInterface,
    SensorModuleType,
    sensors as newSensors,
    SensorsType,
    SensorReadingType
} from '../sensor/';
import { Robot } from './';

/**
 * @type RobotType
 */
export type RobotType = {};

/**
 * @class Robot Representation
 * @classdesc Virtual Robot Specific implementation
 */
export class VRobot extends Robot<
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

    /**
     * get sensor array
     * @returns {SensorsType} sensor values
     */
    get sensors(): SensorsType {
        return this._sensors;
    }

    /**
     * set sensor array
     * @param {SensorModuleType<number[], number>} sensors sensors array
     */
    setSensors(sensors: SensorModuleType<number[], number>): void {
        const { color, distance } = sensors;
        this._sensors.color = color;
        this._sensors.distance = distance;
        this._sensors.updated = Date.now();
        this._updated = Date.now();
    }

    /**
     * get all the sensor readings
     * @returns {SensorModuleType<number[], number>} all sensor readings with sensor type as the key and readings as the value
     */
    // getSensorReadings<T, K extends keyof T>(o: T, sensorTypes: K[]): T[K][] {
    getSensorReadings<K extends keyof SensorModuleInterface<number[], number>>(
        sensorTypes: K[]
    ): SensorsType[K][] {
        return sensorTypes.map((n) => this._sensors[n]);
    }

    /**
     * get the sensor readings by the given sensor type
     * @param {string} type sensor type
     * @returns {object} sensor reading object
     */
    getReadingsBySensor<K extends keyof SensorModuleInterface<number[], number>>(
        type: K
    ): SensorReadingType<number, number> | SensorReadingType<number, number[]> | -1 {
        if (typeof type === 'string' && type !== 'updated') {
            Object.keys(this._sensors).forEach((key) => {
                if (type === key) {
                    return this._sensors[type];
                }
            });
            return -1;
        } else {
            throw new TypeError('invalid sensor type');
        }
    }
}
