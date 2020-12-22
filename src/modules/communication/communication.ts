import { sqrt, pow, round, atan2, boolean } from 'mathjs';
import { MqttClient } from 'mqtt';
import { Coordinate, CoordinateValueInt } from '../coordinate';
import { Robots } from '../robots';
import { SensorsType, SensorValueType } from '../sensors';

export interface CommunicationInterface {
    _mqttClient: MqttClient;
    _maxDistance: number;
    _debug: boolean;

    broadcast: Function;
    // ------------- Internal use only -------------
    normalizedAngle: Function;
}

export abstract class AbstractCommunication<
    TId,
    TCoordinate,
    TCoordinateValueType,
    TSensors,
    TSensorsValueType
> implements CommunicationInterface {
    _mqttClient: MqttClient;
    _maxDistance: number;
    _debug: boolean;
    _robots: Robots<TId>;

    constructor(
        robots: Robots<TId>,
        mqttClient: MqttClient,
        maxDistance = 100,
        debug = false
    ) {
        if (robots === undefined) throw new TypeError('robots unspecified');
        if (mqttClient === undefined) throw new TypeError('mqttClient unspecified');
        this._robots = robots;
        this._mqttClient = mqttClient;
        this._maxDistance = maxDistance;
        this._debug = debug;
    }

    abstract broadcast: Function;

    // Internal use only -------------------------------------------------------
    protected abstract _getDistance: Function;
    protected abstract _getAngle: Function;

    /**
     * method for normalizing a given angle
     * @param {number} a angle value
     * @returns the normalized angle
     */
    normalizedAngle = (a: number): number => {
        let b = (Number(a) + 180) % 360;
        if (b <= 0) b += 360;
        b = b - 180;
        return round(b, 2);
    };
}

export abstract class Communication extends AbstractCommunication<
    number,
    Coordinate<number>,
    CoordinateValueInt<number>,
    SensorsType<number>,
    SensorValueType
> {
    protected _getDistance = (
        from: CoordinateValueInt<number>,
        to: CoordinateValueInt<number>
    ): number => {
        if (
            Object.prototype.hasOwnProperty.call(from, 'x') &&
            Object.prototype.hasOwnProperty.call(from, 'y') &&
            Object.prototype.hasOwnProperty.call(to, 'x') &&
            Object.prototype.hasOwnProperty.call(to, 'y')
        ) {
            const xDiff = to.x - from.x;
            const yDiff = to.y - from.y;
            return round(sqrt(Number(pow(xDiff, 2)) + Number(pow(yDiff, 2))), 2);
        } else {
            throw new TypeError('Both parameters require coordinate values');
        }
    };

    abstract broadcast: Function;

    protected _getAngle = (
        from: CoordinateValueInt<number>,
        to: CoordinateValueInt<number>
    ): number => {
        if (
            Object.prototype.hasOwnProperty.call(from, 'x') &&
            Object.prototype.hasOwnProperty.call(from, 'y') &&
            Object.prototype.hasOwnProperty.call(to, 'x') &&
            Object.prototype.hasOwnProperty.call(to, 'y')
        ) {
            const xDiff = to.x - from.x;
            const yDiff = to.y - from.y;
            return this.normalizedAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
        } else {
            throw new TypeError('Both parameters require coordinate values');
        }
    };
}
