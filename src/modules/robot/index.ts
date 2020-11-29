import { SensorsType } from '../..';

/**
 * @class Robot
 * @classdesc Generic Robot class prototype
 */
abstract class Robot<
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
        return this._id;
    }

    abstract get coordinates(): TCoordinateValueType;
    abstract setCoordinates(coordinates: TCoordinateValueType): void;
    abstract get sensors(): SensorsType;
    abstract setSensors(sensors: TSensorsValueType): void;
}

export * from './robot';
export { Robot };
