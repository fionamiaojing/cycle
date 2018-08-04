import Redux from 'redux';
import generateCycleData from '../../seed';

const initalState = generateCycleData();

let cycleDataReducer = (state = initalState, action) => {
    switch (action.type) {
        default: 
            return state;
    }
};

export default cycleDataReducer;