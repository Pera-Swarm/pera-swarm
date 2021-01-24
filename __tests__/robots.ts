import {
    VRobot as Robot,
    Robots as AbstractRobots,
    AbstractCoordinateRobot,
    CoordinateValueInt,
    Coordinate,
    DistanceSensor,
    SensorsType,
    SimpleCommunication,
    DirectedCommunication
} from '../';

/**
 * @class Robot Representation
 * @classdesc representing the specific robot level functionality in the Swarm Server
 */
export class FinalRobot extends AbstractCoordinateRobot<
    number,
    Coordinate<number>,
    CoordinateValueInt<number>
> {
    _data: any[];
    created: Date;
    timestamp: number;

    /**
     * Robot constructor
     * @param {string} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    constructor(id: number, heading: number, x: number, y: number) {
        super(id, new Coordinate(id, heading, x, y));
        this.created = new Date();
        this.timestamp = Date.now();

        // This is to keep the customized data in the robot object
        this._data = [];
    }

    /**
     * method for getting coordinates
     */
    get coordinates(): CoordinateValueInt<number> {
        return this._coordinates.values;
    }

    /**
     * method for getting data
     */
    get data() {
        return this._data;
    }

    /**
     * method for get a data by its key
     * @param {number} key key for the data
     * @returns {Object} the data object : if it exists
     * @returns undefined : if it doesn't exist
     */
    getData = (key: string | number): object => {
        if (key === undefined) throw new TypeError('key unspecified');
        return this._data[key];
    };

    /**
     * method for set a data by its key
     * @param {number} key key for the data object
     * @param {Object} the data object
     * @returns true
     */
    setData = (key: string | number, value: any) => {
        if (key === undefined) throw new TypeError('key unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        this._data[key] = value;
        return true;
    };

    /**
     * method for getting coordinates
     * @returns coordinate values
     */
    getCoordinates = () => {
        return this._coordinates.values;
    };

    /**
     * method for setting coordinates
     * @param {CoordinateValueInt<number>} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setCoordinates = (coordinate: CoordinateValueInt<number>) => {
        const { heading, x, y } = coordinate;
        this._coordinates.setCoordinates(heading, x, y);
        //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
        this._updated = Date.now();
    };

    /**
     * method for setting coordinates
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setCoordinateValues = (heading: number, x: number, y: number) => {
        this._coordinates.setCoordinates(heading, x, y);
        //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
        this._updated = Date.now();
    };

    /**
     * method for updating the heartbeat of the robot
     * @returns {number} updated datetime value
     */
    updateHeartbeat = (): number => {
        this._updated = Date.now();
        return this._updated;
    };

    /**
     * method for return the live status of the robot
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @returns {boolean} true : if the robot is counted as 'alive'
     * @returns false : if the robot is counted as 'dead'
     */
    isAlive = (interval: number): boolean => {
        if (interval === undefined) throw new TypeError('interval unspecified');
        const seconds = Math.floor((Date.now() - this.updated) / 1000);
        return seconds <= interval;
    };
}

// const { DistanceSensor } = require('../../modules/distanceSensor');

// Class for representing the robots level functionality

export class Robots extends AbstractRobots {
    // swarm: any;
    distanceSensor: DistanceSensor;
    simpleCommunication: SimpleCommunication;
    directedCommunication: DirectedCommunication;

    /**
     * Robots constructor
     */
    constructor(debug = false) {
        super(debug);
        // if (swarm === undefined) throw new TypeError('Swarm unspecified');
        // this.robotList = {};
        // this.size = 0;
        // this.updated = Date.now();
        // this.swarm = swarm;
        // this.debug = true;

        // Attach distance sensor with giving access to arenaConfig data and MQTT publish
        // this.distanceSensor = new DistanceSensor(swarm.arenaConfig, swarm.mqttPublish);

        // // Simple communication
        // this.simpleCommunication = new SimpleCommunication(
        //     this,
        //     swarm.mqttPublish,
        //     100,
        //     this._debug
        // );
        // this.directedCommunication = new DirectedCommunication(
        //     this,
        //     swarm.mqttPublish,
        //     100,
        //     30,
        //     this._debug
        // );
    }

    robotBuilder = (
        id: number,
        heading: number,
        x: number,
        y: any
    ): AbstractCoordinateRobot<
        number,
        Coordinate<number>,
        CoordinateValueInt<number>
    > => {
        return new FinalRobot(id, heading, x, y);
    };

    /**
     * method for finding a robot alive or not
     * @param {number} id robot id
     * @param {number} interval considered time interval
     * @returns {boolean} true : if robot is alive
     * @returns false : if a robot doesn't alive
     */
    isAliveRobot = (id: string | number, interval: any) => {
        if (id === undefined) throw new TypeError('id unspecified');
        if (interval === undefined) throw new TypeError('interval unspecified');
        return this._robotList[id].isAlive(interval);
    };

    /**
     * method for removing the robot by id
     * @param {number} id robot id
     * @param {function} callback a callback function
     * @returns {boolean} true : if successful
     * @returns false : if it fails
     */
    removeRobot = (id: number, callback: Function) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.isExistsRobot(id)) {
            // remove the key along with the value.
            delete this._robotList[id];
            this._size--;
            this._updated = Date.now();
            // this.swarm.mqttPublish('v1/robot/delete', { id }, () => {
            //     if (callback !== undefined) callback(id);
            // });
            return true;
        }
        return false;
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {Coordinate[]} coordinates coordinate data
     */
    updateCoordinates = (coordinates: any[]) => {
        if (coordinates === undefined) throw new TypeError('coordinates unspecified');

        coordinates.forEach((item: { id: any; x: any; y: any; heading: any }) => {
            const { id, x, y, heading } = item;
            if (this.isExistsRobot(id)) {
                if (this.findRobotById(id) !== -1) {
                    this.findRobotById(id).setCoordinates(heading, x, y);
                }
            } else {
                this.addRobot(id, heading, x, y);
            }
            this._updated = Date.now();
        });
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @param {function} callback a callback function. 'id' will be given as a parameter
     */
    prune = (interval: any, callback: any) => {
        if (interval === undefined) throw new TypeError('interval unspecified');

        for (var id in this._robotList) {
            if (this.isAliveRobot(id, interval) == false) {
                this.removeRobot(Number(id), callback);
            }
        }
    };

    broadcast = (instType: string, value: string, options = {}) => {
        if (instType === undefined) throw new TypeError('instruction type unspecified');
        if (value === undefined) throw new TypeError('value unspecified');

        const msg = `${instType} ${value}`;
        // this.swarm.mqttPublish('v1/robot/msg/broadcast', msg, options);
    };

    changeMode = (mode: any, options = {}) => {
        this.broadcast('MODE', mode, options);
    };

    // TODO: add swarm functionality here
    // getSensorReadings
    // stopRobot
    // resetRobot
}
