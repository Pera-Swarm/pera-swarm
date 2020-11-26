import { Coordinate, CoordinateValueType, CoordinateType } from '../coordinate';
import { sensors, sensorModuleTypes, SensorType } from '../sensor';

/**
 * @type RobotType
 */
type RobotType = {};

/**
 * @class Robot Representation
 * @classdesc representing the specific robot level functionality
 */
class Robot {
    protected _id: number | string;
    protected _coordinate: CoordinateType;
    protected _sensors: SensorType;
    protected _created: Date;
    protected _updated: number;
    protected _timestamp: number;

    /**
     * Robot constructor
     * @param {string} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate
     */
    constructor(id: number | string, heading?: number, x?: number, y?: number) {
        this._id = id;
        // if (z !== undefined) {
        //     this._z = z;
        // }
        this._coordinate = new Coordinate(
            id,
            heading === undefined ? 0 : heading,
            x === undefined ? 0 : x,
            y === undefined ? 0 : y
        );
        this._sensors = sensors(id);
        this._created = new Date();
        this._updated = Date.now();
        this._timestamp = Date.now();
    }

    /**
     * method for getting coordinates
     * @returns {CoordinateValueType}
     */
    get coordinates(): CoordinateValueType {
        return this._coordinate.values;
    }

    /**
     * method for setting coordinates
     * if z is given, the z coordinate is updated only if the z coordinate is assigned to an initial value at the instance creation only.
     * if not, only the other coordinates are updated accordingly
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate
     */
    setCoordinates = (heading: number, x: number, y: number) => {
        this._coordinate.setCoordinates(heading, x, y);
        this._updated = Date.now();
    };

    /**
     * method for getting all the sensor readings
     * @returns {object} all sensor readings with sensor type as the key and readings as the value
     */
    getSensorReadings = () => {
        var result = {};
        for (const key in this._sensors) {
            if (this._sensors.hasOwnProperty(key)) {
                if (sensorModuleTypes.includes(key)) {
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

    /**
     * method for updating the heartbeat of the robot
     * @returns {Date} updated datetime value
     */
    updateHeartbeat = () => {
        this._updated = Date.now();
        return this._updated;
    };

    /**
     * method for return the live status of the robot
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @returns {boolean} true : if the robot is counted as 'alive'
     * @returns false : if the robot is counted as 'dead'
     */
    isAlive = (interval: number) => {
        if (interval === undefined) throw new TypeError('interval unspecified');
        const seconds = Math.floor((Date.now() - this._updated) / 1000);
        return seconds <= interval;
    };
}

export { Robot, RobotType };
