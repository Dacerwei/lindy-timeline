import { ADD_EVENT, DELETE_EVENT, CLEAR_EVENTS } from '../constants';

export const addEvent = (title, startDate, endDate) => {
    const action = {
        type: ADD_EVENT,
        title,
        startDate,
        endDate
    };
    console.log('action in addEvent', action);
    return action;
}

export const deleteEvent = (id) => {
    const action = {
        type: DELETE_EVENT,
        id: id
    }
    console.log('deleting in actions', action);
    return action;
}

export const clearEvents = () => {
    return {
        type: CLEAR_EVENTS
    }
}