import {
    Coordinate,
    CoordinateValueInt,
    validateCoordinateType,
    ValidityType,
    validateCoordinateValueType
} from '../coordinate';

/**
 * @class Localization
 */
export class Localization<TId> {
    protected _list: Coordinate<TId>[];
    protected _updated: number;
    protected _timestamp: Date;

    constructor() {
        this._list = [];
        this._updated = Date.now();
        this._timestamp = new Date();
    }

    /**
     * coordinates list.
     */
    get list(): Coordinate<TId>[] {
        return this._list;
    }

    /**
     * size of the coordinates list.
     */
    get size(): number {
        return this._list.length;
    }

    /**
     * updated value.
     */
    get updated(): number {
        return this._list.length;
    }

    /**
     * timestamp value.
     */
    get timestamp(): Date {
        return this._timestamp;
    }

    /**
     * Method for finding the index of a coordinate in the list by id.
     * @param {TId} id robot id
     * @returns {number} the index of the coordinate if the id exists, if not -1
     */
    findIndexById = (id: TId): number => {
        let found = -1,
            i = 0;
        for (let i = 0; i < this._list.length; i += 1) {
            if (this._list[i]['id'] === id) {
                return i;
            }
        }
        return found;
    };

    /**
     * Method fot getting the coordinates list.
     */
    getCoordinates = (): CoordinateValueInt<TId>[] => {
        let coordinates: CoordinateValueInt<TId>[] = [];
        this._list.map((item: Coordinate<TId>) => {
            coordinates.push(item.values);
        });
        return coordinates;
    };

    /**
     * Method for validating a coordinate.
     * @param {Coordinate} coordinate coordinate instance
     * @returns {ValidityType}
     */
    validate = (coordinate: Coordinate<TId>): ValidityType => {
        return validateCoordinateType(coordinate);
    };

    /**
     * Method for validating a coordinate.
     * @param {CoordinateValueInt} coordinate coordinate instance
     * @returns {ValidityType}
     */
    validateValue = (coordinate: CoordinateValueInt<TId>): ValidityType => {
        return validateCoordinateValueType(coordinate);
    };

    /**
     * Method for adding a coordinate to the coordinates list.
     * @param {CoordinateValueInt} coordinate coordinate instance
     * @returns {ValidityType|undefined}
     */
    add = (coordinate: CoordinateValueInt<TId>): ValidityType | undefined => {
        let status: ValidityType | undefined;
        status = -1;
        if (this.validateValue(coordinate) === true) {
            if (this.findIndexById(coordinate.id) === -1) {
                // push, if the coordinate is not in list
                const { id, heading, x, y } = coordinate;
                status = this._list.push(new Coordinate(id, heading, x, y));
                this._updated = Date.now();
            } else {
                // update the list by calling #updateOne()
                status = this.updateOne(coordinate);
            }
        }
        return status;
    };

    /**
     * Method for updating the coordinates list.
     * @param {CoordinateValueInt|CoordinateValueInt[]} coordinates
     * @returns {ValidityType|undefined} return true if the update is successful,
     * if not return -1.
     */
    update = (
        coordinates: CoordinateValueInt<TId> | CoordinateValueInt<TId>[]
    ): ValidityType | undefined => {
        if (Array.isArray(coordinates)) {
            // if {coordinates} is an coordinate array, call #updateMany()
            return this.updateMany(coordinates);
        } else if (this.validateValue(coordinates)) {
            // if {coordinate} is a coordinate, call #updateOne()
            return this.updateOne(coordinates);
        } else {
            // invalid
            return -1;
        }
    };

    /**
     * Method for updating the coordinates list.
     * @param {CoordinateValueInt} coordinate coordinate instance
     * @returns {ValidityType|undefined} true if the update is successful,
     * if not return -1.
     */
    updateOne = (coordinate: CoordinateValueInt<TId>): ValidityType | undefined => {
        // use only #updateByIndex() to update the coordinate values,
        // to ensure all are valid coordinate object instances.
        return this.updateByIndex(this.findIndexById(coordinate.id), coordinate);
    };

    /**
     * Method for updating the coordinates list.
     * this method will recursively update the coordinates list.
     * @param {CoordinateValueInt[]} coordinates array of coordinates
     */
    updateMany = (coordinates: CoordinateValueInt<TId>[]) => {
        let status: ValidityType | undefined;
        status = -1;
        // update if only the param is an array
        if (Array.isArray(coordinates)) {
            for (let i = 0; i < coordinates.length; i += 1) {
                if (this.findIndexById(coordinates[i]['id']) === -1) {
                    // add to list
                    status = this.add(coordinates[i]);
                    if (status !== -1) {
                        status = true;
                    }
                } else {
                    // update list
                    status = this.updateOne(coordinates[i]);
                }
            }
        }
        return status;
    };

    /**
     * Method for updating a coordinate in the list by id.
     * @param {number} index index of coordinate list
     * @param {CoordinateValueInt} coordinate coordinate instance
     * @returns {ValidityType|undefined} true if the update is successful,
     * if not return -1.
     */
    updateByIndex = (index: number, coordinate: CoordinateValueInt<TId>) => {
        // neglect if the index is invalid or doesn't equal to {coordinate.id}
        if (index >= this.size || index < 0) {
            return -1;
        } else if (this._list[index]['id'] !== coordinate.id) {
            return -1;
        } else {
            if (this.validateValue(coordinate) === true) {
                // update the particular coordinate by calling #setCoordinates() method
                const { heading, x, y } = coordinate;
                this._list[index].setCoordinates(heading, x, y);
                this._updated = Date.now();
                return true;
            }
        }
    };
}
