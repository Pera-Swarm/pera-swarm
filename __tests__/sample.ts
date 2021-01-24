import { use } from 'chai';

class ARobot {
    constructor() {
        console.log('ARobot');
    }
}

class BRobot extends ARobot {
    constructor() {
        super();
        console.log('BRobot');
    }
}

const createRobot = (buildClass) => {
    console.log(buildClass, typeof buildClass, buildClass === ARobot);
    const robot = new buildClass();
    // console.log(buildClass, instanceof buildClass);
    // if(instanceof buildClass === ARobot){
    // }
};

createRobot(ARobot);
createRobot(BRobot);
