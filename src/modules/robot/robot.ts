import { Coordinate, CoordinateValueInt } from '../coordinate/';
import {
    SensorModuleInterface,
    SensorModuleType,
    sensors as newSensors,
    SensorsType
} from '../sensors/';

/**
 * @class Robot
 * @classdesc Generic Robot class prototype
 */
export abstract class Robot<
    TId,
    TCoordinate,
    TCoordinateValueType,
    TSensors,
    TSensorsValueType
> {
    protected _id: TId;
    protected _coordinates: TCoordinate;
    protected _sensors: TSensors;
    protected _updated: number;

    constructor(id: TId, coordinates: TCoordinate, sensors: TSensors) {
        this._id = id;
        this._coordinates = coordinates;
        this._sensors = sensors;
        this._updated = Date.now();
    }

    /**
     * the robot id
     */
    get id() {
        return this._id;
    }

    /**
     * the robot updated
     */
    get updated() {
        return this._updated;
    }

    abstract get coordinates(): TCoordinateValueType;
    abstract setCoordinates(coordinates: TCoordinateValueType): void;
    abstract get sensors(): TSensors;
    abstract setSensors(sensors: TSensorsValueType): void;
}

/**
 * @class Robot Representation
 * @classdesc Virtual Robot Specific implementation
 */
export class VRobot extends Robot<
    number,
    Coordinate<number>,
    CoordinateValueInt<number>,
    SensorsType<number>,
    SensorModuleType<number, number[], number>
> {
    protected _created: Date;
    protected _timestamp: number;

    /**
     * Robot constructor
     * @param {number} id robot id
     * @param {Coordinate<number>} coordinates coordinates
     * @param {Sensors} sensors sensor array
     */
    constructor(
        id: number,
        coordinates?: Coordinate<number>,
        sensors?: SensorsType<number>
    ) {
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
     * @returns {CoordinateValueInt<number>} coordinate values
     */
    get coordinates(): CoordinateValueInt<number> {
        return this._coordinates.values;
    }

    /**
     * set coordinates
     * @param {CoordinateValueInt<number>} CoordinateValueInt<T> coordinate values
     */
    setCoordinates(coordinates: CoordinateValueInt<number>): void {
        const { heading, x, y } = coordinates;
        this._coordinates.setCoordinates(heading, x, y);
        this._updated = Date.now();
    }

    /**
     * get sensor array
     * @returns {SensorsType<number>} sensor values
     */
    get sensors(): SensorsType<number> {
        return this._sensors;
    }

    /**
     * set sensor array
     * @param {SensorModuleType<number, number[], number>} sensors sensors array
     */
    setSensors(sensors: SensorModuleType<number, number[], number>): void {
        const { color, distance } = sensors;
        this._sensors.color = color;
        this._sensors.distance = distance;
        this._sensors.updated = Date.now();
        this._updated = Date.now();
    }

    /**
     * get all the sensor readings
     * @param {K[]}
     * @returns {SensorsType<number>} all sensor readings with sensor type as the key and readings as the value
     */
    getSensorReadings<K extends keyof SensorModuleInterface<number, number[], number>>(
        sensorTypes: K[]
    ): SensorsType<number>[K][] {
        if (sensorTypes !== undefined) {
            var result: SensorsType<number>[K][];
            result = [];
            sensorTypes.forEach((s) => {
                if (this._sensors[s] !== undefined) {
                    result.push(this._sensors[s]);
                }
            });
            return result;
        } else {
            throw new TypeError('invalid sensor types');
        }
    }
}
