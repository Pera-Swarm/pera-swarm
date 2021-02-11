'use strict';
let __extends =
    (this && this.__extends) ||
    (function () {
        let extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (let p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
exports.__esModule = true;
let __1 = require('../');
/**
 * @class Robot Representation
 * @classdesc representing the specific robot level functionality in the Swarm Server
 */
let FinalRobot = /** @class */ (function (_super) {
    __extends(FinalRobot, _super);
    /**
     * Robot constructor
     * @param {string} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    function FinalRobot(id, heading, x, y) {
        let _this = _super.call(this, id, new __1.Coordinate(id, heading, x, y)) || this;
        /**
         * method for get a data by its key
         * @param {number} key key for the data
         * @returns {Object} the data object : if it exists
         * @returns undefined : if it doesn't exist
         */
        _this.getData = function (key) {
            if (key === undefined) throw new TypeError('key unspecified');
            return _this._data[key];
        };
        /**
         * method for set a data by its key
         * @param {number} key key for the data object
         * @param {Object} the data object
         * @returns true
         */
        _this.setData = function (key, value) {
            if (key === undefined) throw new TypeError('key unspecified');
            if (value === undefined) throw new TypeError('value unspecified');
            _this._data[key] = value;
            return true;
        };
        /**
         * method for getting coordinates
         * @returns coordinate values
         */
        _this.getCoordinates = function () {
            return _this._coordinates.values;
        };
        /**
         * method for setting coordinates
         * @param {CoordinateValueInt<number>} heading heading coordinate
         * @param {number} x x coordinate
         * @param {number} y y coordinate
         */
        _this.setCoordinates = function (coordinate) {
            let heading = coordinate.heading,
                x = coordinate.x,
                y = coordinate.y;
            _this._coordinates.setCoordinates(heading, x, y);
            //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
            _this._updated = Date.now();
        };
        /**
         * method for setting coordinates
         * @param {number} heading heading coordinate
         * @param {number} x x coordinate
         * @param {number} y y coordinate
         */
        _this.setCoordinateValues = function (heading, x, y) {
            _this._coordinates.setCoordinates(heading, x, y);
            //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
            _this._updated = Date.now();
        };
        /**
         * method for updating the heartbeat of the robot
         * @returns {number} updated datetime value
         */
        _this.updateHeartbeat = function () {
            _this._updated = Date.now();
            return _this._updated;
        };
        /**
         * method for return the live status of the robot
         * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
         * @returns {boolean} true : if the robot is counted as 'alive'
         * @returns false : if the robot is counted as 'dead'
         */
        _this.isAlive = function (interval) {
            if (interval === undefined) throw new TypeError('interval unspecified');
            let seconds = Math.floor((Date.now() - _this.updated) / 1000);
            return seconds <= interval;
        };
        _this.created = new Date();
        _this.timestamp = Date.now();
        // This is to keep the customized data in the robot object
        _this._data = [];
        return _this;
    }
    Object.defineProperty(FinalRobot.prototype, 'coordinates', {
        /**
         * method for getting coordinates
         */
        get: function () {
            return this._coordinates.values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinalRobot.prototype, 'data', {
        /**
         * method for getting data
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return FinalRobot;
})(__1.AbstractCoordinateRobot);
exports.FinalRobot = FinalRobot;
// const { DistanceSensor } = require('../../modules/distanceSensor');
// Class for representing the robots level functionality
let Robots = /** @class */ (function (_super) {
    __extends(Robots, _super);
    /**
     * Robots constructor
     */
    function Robots(debug) {
        if (debug === void 0) {
            debug = false;
        }
        let _this = _super.call(this, debug) || this;
        _this.robotBuilder = function (id, heading, x, y) {
            return new FinalRobot(id, heading, x, y);
        };
        /**
         * method for finding a robot alive or not
         * @param {number} id robot id
         * @param {number} interval considered time interval
         * @returns {boolean} true : if robot is alive
         * @returns false : if a robot doesn't alive
         */
        _this.isAliveRobot = function (id, interval) {
            if (id === undefined) throw new TypeError('id unspecified');
            if (interval === undefined) throw new TypeError('interval unspecified');
            return _this._robotList[id].isAlive(interval);
        };
        /**
         * method for removing the robot by id
         * @param {number} id robot id
         * @param {function} callback a callback function
         * @returns {boolean} true : if successful
         * @returns false : if it fails
         */
        _this.removeRobot = function (id, callback) {
            if (id === undefined) throw new TypeError('id unspecified');
            if (_this.isExistsRobot(id)) {
                // remove the key along with the value.
                delete _this._robotList[id];
                _this._size--;
                _this._updated = Date.now();
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
        _this.updateCoordinates = function (coordinates) {
            if (coordinates === undefined) throw new TypeError('coordinates unspecified');
            coordinates.forEach(function (item) {
                let id = item.id,
                    x = item.x,
                    y = item.y,
                    heading = item.heading;
                if (_this.isExistsRobot(id)) {
                    if (_this.findRobotById(id) !== -1) {
                        _this.findRobotById(id).setCoordinates(heading, x, y);
                    }
                } else {
                    _this.addRobot(id, heading, x, y);
                }
                _this._updated = Date.now();
            });
        };
        /**
         * method for updating the coordinates of the given robots coordinates data
         * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
         * @param {function} callback a callback function. 'id' will be given as a parameter
         */
        _this.prune = function (interval, callback) {
            if (interval === undefined) throw new TypeError('interval unspecified');
            for (let id in _this._robotList) {
                if (_this.isAliveRobot(id, interval) == false) {
                    _this.removeRobot(Number(id), callback);
                }
            }
        };
        _this.broadcast = function (instType, value, options) {
            if (options === void 0) {
                options = {};
            }
            if (instType === undefined)
                throw new TypeError('instruction type unspecified');
            if (value === undefined) throw new TypeError('value unspecified');
            let msg = instType + ' ' + value;
            // this.swarm.mqttPublish('v1/robot/msg/broadcast', msg, options);
        };
        _this.changeMode = function (mode, options) {
            if (options === void 0) {
                options = {};
            }
            _this.broadcast('MODE', mode, options);
        };
        return _this;
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
    return Robots;
})(__1.Robots);
exports.Robots = Robots;
