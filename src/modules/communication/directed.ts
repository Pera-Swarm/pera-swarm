import { abs } from 'mathjs';
import { MqttClient } from 'mqtt';
import { CoordinateValueInt } from '../coordinate';
import { Robots } from '../robots';
import { Communication } from './';

export class DirectedCommunication extends Communication {
    protected _angleThreshold: number;

    constructor(
        robots: Robots<number>,
        mqttClient: MqttClient,
        maxDistance: number,
        angleThreshold: number = 30,
        debug: boolean = false
    ) {
        super(robots, mqttClient, maxDistance, debug);
        this._angleThreshold = angleThreshold;
        if (this._debug) {
            console.log('DirectedCommunication:Debug:', this._debug);
        }
    }

    /**
     * broadcast method
     * @param robotId {TId} robot id
     * @param message {string} message
     * @param callback {Function} callback function
     */
    broadcast = (robotId: string, message: string, callback: Function) => {
        if (robotId === undefined) throw new TypeError('robotId unspecified');
        if (message === undefined) throw new TypeError('message unspecified');

        const robots = this._robots.getCoordinatesAll();
        const thisRobot = this._robots.getCoordinatesById(robotId);
        var receivers = 0;

        robots.forEach((coordinate: CoordinateValueInt<number>, index: number) => {
            if (coordinate.id != thisRobot.id) {
                const distCheck = this.distanceCheck(
                    this._getDistance(thisRobot, coordinate)
                );
                const angleCheck = this.angleCheck(
                    thisRobot.heading,
                    this._getAngle(thisRobot, coordinate)
                );

                if (distCheck && angleCheck) {
                    // within the distance range & angle threshold, so send the messaage
                    receivers++;
                    if (this._debug) console.log(`robot #${coordinate.id}: pass`);
                    this._mqttClient.publish(
                        `v1/communication/${coordinate.id}`,
                        message
                    );
                }
            }
        });

        if (callback != undefined) callback({ receivers: receivers });
    };

    /**
     * ethod for checking the given angle value is within the accepted value range
     * @param {number} heading heading value
     * @param {number} angle angle value
     * @returns {boolean} the verification of angle
     */
    angleCheck = (heading: number, angle: number) => {
        // Get the absolute difference between robot heading and target robot's absolute angle
        var difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;

        if (this._debug)
            console.log(`heading: ${heading}, angle:${angle}, diff:${difference}`);

        return abs(difference) <= this._angleThreshold / 2;
    };
}
