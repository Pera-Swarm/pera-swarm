# pera-swarm [![npm (scoped)](https://img.shields.io/npm/v/pera-swarm.svg)](https://github.com/Pera-Swarm/pera-swarm/) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Pera-Swarm/pera-swarm/%F0%9F%9A%80%20Release)](https://github.com/Pera-Swarm/pera-swarm/releases) [![GitHub issues](https://img.shields.io/github/issues/Pera-Swarm/pera-swarm)](https://github.com/Pera-Swarm/pera-swarm/issues)
A generalized, efficient, and flexible JavaScript library for building swarm robotics simulators.

## Overview
*pera-swarm* is a library for building swarm robotic simulators using *Node.js*. This library provides an extensive number of generalized and abstract implementations for related entities (including entities like robot, sensor, coordinate, etc...) for virtual applications associated with not only swarm robotics, but also multi-robotic experiments as well.

### Usage
#### 1. Installation 
Installation done using `npm install` command:
```
$ npm i --save pera-swarm
```

#### 2. Create entities
You can create generalized entity instances: "VRobot"

##### index.js
```
const { VRobot, Coordinate, validateCoordinateType, SimpleLocalizationSystem, ColorSensor } = require('pera-swarm');

// Sample Robot instance with an id of 1
const robot = new VRobot(1);

console.log(robot.id);
console.log(robot.coordinates);
console.log(robot.sensors);
console.log(robot.created);
console.log(robot.timestamp);
console.log(robot.updated);
console.log(robot.getSensorReadings(['color', 'distance', 'compass']));
// compass sensor implementation is not available yet :-)

// Sample Coordinate instance with an id of 1
const coordinate = new Coordinate(1);

console.log(coordinate.id);
console.log(coordinate.values);
console.log(validateCoordinateType(coordinate));
coordinate.reset();

// Sample Color Sensor with an id of 1
const colorSensor = new ColorSensor(1);

console.log(colorSensor);
console.log(colorSensor.id);
console.log(colorSensor.value);
console.log(colorSensor.getReading());

// Sample Localization System
const loc_system = new SimpleLocalizationSystem();

const SAMPLE_COORDINATE_1 = {
    id: 1,
    heading: 1,
    x: -1,
    y: 2
};

const SAMPLE_COORDINATE_2 = {
    id: 2,
    heading: 2,
    x: -3,
    y: 9
};

// Call only update for adding or updating the coordinates list
// supports for both single objects and arrays of CoordinateValueType
loc_system.update([SAMPLE_COORDINATE_1, SAMPLE_COORDINATE_2]);
loc_system.update({ ...SAMPLE_COORDINATE_2, y: 10 });
console.log(loc_system.ids);
console.log(loc_system.coordinates);
console.log(loc_system.idExists(1));
console.log(loc_system.size);
```

### Documentation
All the entities should initiated with and `id` parameter. You can use the generic implementations or you can create your own implementation by just extending the generic class types for specific use-cases.

You can find more information about *pera-swarm* on the [*Official Documentation Page*](https://pera-swarm.ce.pdn.ac.lk/docs/).

### Contribute

### Licence
This project is licensed under [MIT Licence](https://github.com/Pera-Swarm/pera-swarm/blob/main/LICENSE).
