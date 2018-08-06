import Redux from 'redux';
import generateCycleData from '../../seed';

const initalState = generateCycleData();

let cycleDataReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'ADD_PEOPLE':
            let newState = state.slice();
            newState[action.payload.cycleIndex].people.push(action.payload.person);
            console.log(newState);
            return newState;
        default: 
            //cycle is only considered COMPLETE when both people array and answer array within the questions array are filled
            return state.map((cycle) => {
                if (cycle.people.length > 0 && cycle.question.reduce((acc, cur) => acc && (cur.answer.length > 0), true)) {
                    return Object.assign(cycle, {status: 'Complete'});
                }
                return cycle;
            });
    }
};

export default cycleDataReducer;