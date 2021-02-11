let assert = require('chai').assert;
let chai = require('chai');
let expect = chai.expect;

const { sensors, ColorSensor, DistanceSensor } = require('../');

let s;
let updated;

const SAMPLE_ID = 1;

const INITIAL_COLOR_SENSOR_VALUES = [0, 0, 0];
const SAMPLE_COLOR_SENSOR_VALUES_1 = [123, 231, 19];
const SAMPLE_COLOR_SENSOR_VALUES_2 = [1, 150, 121];

const INITIAL_DISTANCE_SENSOR_VALUE = 0;
const SAMPLE_DISTANCE_SENSOR_VALUE_1 = 123;
const SAMPLE_DISTANCE_SENSOR_VALUE_2 = 150;

beforeEach(function () {
    s = sensors(SAMPLE_ID);
    updated = s.updated;
});

describe('Sensors', function () {
    describe('#sensors()', function () {
        it('should create a sensor instance', function () {
            expect(sensors).to.throw(TypeError);
            s = sensors(SAMPLE_ID);
            // updated
            expect(s).to.haveOwnProperty('updated');
            assert.typeOf(s.updated, 'number');
            expect(s.updated).to.gte(updated);
            // color
            expect(s).to.haveOwnProperty('color');
            expect(s.color).to.be.instanceOf(ColorSensor);
            assert.typeOf(s.color, 'object');
            expect(s.color.id).to.equal(SAMPLE_ID);
            expect(s.color.value).to.deep.equal(INITIAL_COLOR_SENSOR_VALUES);
            // distance
            expect(s).to.haveOwnProperty('distance');
            expect(s.distance).to.be.instanceOf(DistanceSensor);
            assert.typeOf(s.distance, 'object');
            expect(s.distance.id).to.equal(SAMPLE_ID);
            expect(s.distance.value).to.deep.equal(INITIAL_DISTANCE_SENSOR_VALUE);
        });
    });
});
