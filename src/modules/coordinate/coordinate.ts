/**
 * @type CoordinateValueType
 */
export type CoordinateValueType<TId> = {
    id: TId;
    heading: number;
    x: number;
    y: number;
};

/**
 * @type CoordinateType
 */
export type CoordinateType<TId> = {
    id: TId;
    values: CoordinateValueType<TId>;
    reset: Function;
    setCoordinates: Function;
};

/**
 * @class Coordinate
 */
export class Coordinate<TId> {
    protected _id: TId;
    protected _heading: number;
    protected _x: number;
    protected _y: number;

    constructor(id: TId, heading: number, x: number, y: number) {
        this._id = id;
        this._heading = heading;
        this._x = x;
        this._y = y;
    }

    /**
     * the coordinate id
     */
    get id(): TId {
        return this._id;
    }

    /**
     * the coordinate values
     */
    get values(): CoordinateValueType<TId> {
        return {
            id: this._id,
            heading: this._heading,
            x: this._x,
            y: this._y
        };
    }

    /**
     * reset coordinates
     */
    reset() {
        this._heading = 0;
        this._x = 0;
        this._y = 0;
    }

    /**
     * set coordinates
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setCoordinates(heading: number, x: number, y: number) {
        this._heading = heading;
        this._x = x;
        this._y = y;
    }
}

/**
 * @type ValidityType
 */
export type ValidityType = boolean | number;

/**
 * method for validating a coordinate object.
 * returns true if valid or -1 if not.
 * @param {coordinate} coordinate
 */
export function validateCoordinate<TId>(coordinate: CoordinateType<TId>): ValidityType {
    var validity: ValidityType;
    var i: number;
    validity = -1;
    i = 0;
    if (Object.prototype.hasOwnProperty.call(coordinate, 'id')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(coordinate, 'heading')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(coordinate, 'x')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(coordinate, 'y')) {
        i += 1;
    }
    if (i === 4) {
        validity = true;
    }
    return validity;
}

export class CoordinateZ<TId> extends Coordinate<TId> {}
