import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent, deleteEvent, clearEvents } from '../actions';
import moment from 'moment';
import _ from 'lodash';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startDate: '',
            endDate: ''
        }
    }
    addEvent() {
        this.props.addEvent(this.state.title, this.state.startDate, this.state.endDate);
    }

    deleteEvent(id) {
        this.props.deleteEvent(id);
    }

    renderEvents() {
        const { events } = this.props;
        return (
            <ul className= "list-group col-sm-4">
                {
                    _.map(events, event => {
                        return (
                            <li key={event.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{event.title}</div>
                                    <div>Start date: <em>{moment(new Date(event.startDate)).format('LL')}</em></div>
                                    <div>end date: <em>{moment(new Date(event.endDate)).format('LL')}</em></div>
                                </div>
                                <div
                                    className="list-item delete-button"
                                    onClick={() => this.deleteEvent(event.id)}
                                >
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
    render() {
        return(
            <div className="App">
                <div className="title">
                    Lindy Timeline
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="add a Swing Event"
                            onChange={e => this.setState({title: e.target.value})}
                        />
                        <input
                            className="form-control"
                            type="datetime-local"
                            onChange={e => this.setState({startDate: e.target.value})}
                        />
                        <input
                            className="form-control"
                            type="datetime-local"
                            onChange={e => this.setState({endDate: e.target.value})}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addEvent()}
                    >
                    Add Event
                    </button>
                </div>
                {
                    this.renderEvents()
                }
                <div
                    className="btn btn-danger"
                    onClick={() => this.props.clearEvents()}
                >
                    Clear Events
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state
    }
}

export default connect(mapStateToProps, {addEvent, deleteEvent, clearEvents})(App);