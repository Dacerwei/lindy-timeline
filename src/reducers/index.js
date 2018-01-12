import { ADD_EVENT, DELETE_EVENT, CLEAR_EVENTS } from '../constants';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const event = (action) => {
    let { title, startDate, endDate } = action;
    return {
        id: Math.random(),
        title,
        startDate,
        endDate
    }
}

const removeById = (state = [], id) => {
    const events = state.filter(event => event.id !== id);
    console.log('new reduced reminders', events);
    return events;
}

const events = (state = [], action) => {
    let events = null;
    try {
        state = read_cookie('events');
    }
    catch(error) {
        console.log('cookie error deleting cookie');
        delete_cookie();
    }
    switch(action.type) {
        case ADD_EVENT:
            events = [...state, event(action)];
            bake_cookie('events', events);
            return events;

        case DELETE_EVENT:
            events = removeById(state, action.id);
            bake_cookie('events', events);
            return events;

        case CLEAR_EVENTS:
            events = [];
            bake_cookie('events', events);
            return events;

        default:
            return state;
    }
}



export default events;