import axios from 'axios';

export const addPeople = (cycleIndex, person) => {
    return { 
        type: 'ADD_PEOPLE',
        payload: {
            cycleIndex,
            person
        }
    
    };
};

export const deletePeople = (cycleIndex, name) => {
    return {
        type: 'DELETE_PEOPLE',
        payload: {
            cycleIndex,
            name
        }
    };
};

//when save button clicked, make a post request to server as well as change locally or make another get request
export const postPeople = (username, cycleIndex, person) => {
    return function(dispatch) {
        axios.post(`/posturl`, {
           username,
           cycleIndex,
           person
        })
          .then((response) => dispatch(
            addPeople(cycleIndex, person)
          )
        )
          .catch((error) => {
            throw error;
        });
    };
};
