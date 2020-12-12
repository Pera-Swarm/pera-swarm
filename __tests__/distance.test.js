var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { DistanceSensor } = require('../');

var s;
var updated;

const SAMPLE_ID = 1;
const INITIAL_VALUE = 0;
const SAMPLE_VALUE_1 = 123;
const SAMPLE_VALUE_2 = 126;

beforeEach(function () {
    s = new DistanceSensor(SAMPLE_ID);
    updated = s.getReading().updated;
});

describe('Distance Sensor', function () {
    describe('#getReading()', function () {
        it('should get the sensor reading', function () {
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('id');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('value');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('updated');
            expect(s.getReading()).to.not.null;
            expect(s.getReading()).to.not.be.empty;
            expect(s.getReading()).to.not.undefined;
            assert.typeOf(s.getReading(), 'object');
            assert.typeOf(s.getReading().id, 'number');
            assert.typeOf(s.getReading().value, 'number');
            assert.typeOf(s.getReading().updated, 'number');
        });
    });

    describe('#setReading()', function () {
        it('should set the sensor value', function () {
            assert.equal(s.getReading().value, INITIAL_VALUE);
            s.setReading(SAMPLE_VALUE_1);
            assert.notEqual(s.getReading().value, INITIAL_VALUE);
            assert.equal(s.getReading().value, SAMPLE_VALUE_1);
            expect(s.updated).gte(updated);
            s.setReading(SAMPLE_VALUE_2);
            assert.notEqual(s.getReading().value, INITIAL_VALUE);
            assert.equal(s.getReading().value, SAMPLE_VALUE_2);
            expect(s.updated).gte(updated);
        });
    });
});
