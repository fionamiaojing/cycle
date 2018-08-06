export const addPeople = (cycleIndex, person) => {
    return { 
        type: 'ADD_PEOPLE',
        payload: {
            cycleIndex,
            person
        }
    
    };
};

export const deletePeople = (cycleIndex, person) => {
    return {
        type: 'DELETE_PEOPLE',
        payload: {
            cycleIndex,
            person
        }
    };
};