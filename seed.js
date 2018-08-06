
// CycleData = [cycles]
// cycles = {
//     name: string,
//     status: string
//     people : [list of people object],
//     question: [list of question object],
// }
// peopleObj = {
//     name: string,
//     image: url,
// }
// quesitonObj = {
//     des: desObj,
//     answer: [strings],
// };
// desObj = {
//     type: string,
//     question: string,
//     description: string,
//     response: {
//         something: blahblahblah
//     }
// }

const faker = require('faker');

const generateRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const generateListOfData = (minInt, maxInt, func) => {
    let output = [];
    let noOfData = generateRandomInt(minInt, maxInt);
    for (let i = 0; i < noOfData; i++) {
        const currentData = func();
        output.push(currentData);
    }
    return output;
};

const generateCycleData = () => {
    return generateListOfData(20, 30, generateOneCycle);
};

const generateOneCycle = () => {
    return {
        //use faker.lorem here because it is much faster than faker.name based on test
        name: faker.lorem.words(1),
        status: 'Imcomplete', //can be changed after questions has been filled and then write status to database 
        people: generatePeople(),
        question: generateQuestions()
    };
};

const generatePeople = () => {
    return generateListOfData(0, 4, generateOnePerson);
};

const generateOnePerson = () => {
    return {
        name: faker.lorem.words(1),
        image: faker.image.avatar()
    };
};

const generateQuestions = () => { 
    return generateListOfData(1, 3, generateOneQuestion);
};

const generateOneQuestion = () => {
    return {
        des: generateDes(),
        answer: generateAnwser()
    };
};

const generateDes = () => {
    return {
        type: faker.lorem.words(1),
        question: faker.lorem.words(5),
        description: faker.lorem.words(10),
        response: {
            1: 'something1',
            2: 'something2',
            3: 'something3'
        }
    };
};

const generateAnwser = () => {
    return generateListOfData(0, 3, () => {
        faker.lorem.words(2);
    });
};


// const generateCycleData = () => {
//     let cycleData = [];
//     let noOfData = generateRandomInt(20, 30);
//     for (let i = 0; i < noOfData; i++) {
//         const currentCycle = generateOneCycle();
//         cycleData.push(currentCycle);
//     }
//     return cycleData;
// };

// const generatePeople = () => {
//     let people = [];
//     let noOfPeople = generateRandomInt(0, 4);
//     for (let i = 0; i < noOfPeople; i++) {
//         const currentPerson = generateOnePerson();
//         people.push(currentPerson);
//     }
//     return people;
// };

export default generateCycleData;