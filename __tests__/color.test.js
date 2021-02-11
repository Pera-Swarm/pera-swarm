let assert = require('chai').assert;
let chai = require('chai');
let expect = chai.expect;

const { ColorSensor } = require('../');

let s;
let updated;

const SAMPLE_ID = 1;
const INITIAL_VALUES = [0, 0, 0];
const SAMPLE_VALUES_1 = [123, 231, 19];
const SAMPLE_VALUES_2 = [1, 150, 121];

beforeEach(function () {
    s = new ColorSensor(SAMPLE_ID);
    updated = s.getReading().updated;
});

describe('Color Sensor', function () {
    describe('#getReading()', function () {
        it('should get the sensor readings', function () {
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('id');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('value');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('updated');
            expect(s.getReading()).to.not.null;
            expect(s.getReading()).to.not.be.empty;
            expect(s.getReading()).to.not.undefined;
            assert.typeOf(s.getReading(), 'object');
            assert.typeOf(s.getReading().id, 'number');
            assert.typeOf(s.getReading().value, 'array');
            assert.typeOf(s.getReading().updated, 'number');
        });
    });

    describe('#setReading()', function () {
        it('should set the sensor values', function () {
            assert.deepEqual(s.getReading().value, INITIAL_VALUES);
            s.setReading(SAMPLE_VALUES_1);
            assert.notEqual(s.getReading().value, INITIAL_VALUES);
            assert.deepEqual(s.getReading().value, SAMPLE_VALUES_1);
            expect(s.updated).gte(updated);
            s.setReading(SAMPLE_VALUES_2);
            assert.notEqual(s.getReading().value, INITIAL_VALUES);
            assert.deepEqual(s.getReading().value, SAMPLE_VALUES_2);
            expect(s.updated).gte(updated);
        });
    });
});
