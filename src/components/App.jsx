import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent, deleteEvent, clearEvents } from '../actions';
import moment from 'moment';
import _ from 'lodash';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

const paperStyle = {
    height: 'auto',
    width: '80%',
    textAlign:'center',
    margin: 'auto',
    padding: '10px'
};
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
            <Paper style={paperStyle} zDepth={1} >
                <List>
                    {
                        _.map(events, event => {
                            return (
                                <ListItem
                                    key={event.id}
                                    primaryText={
                                        <h2>{event.title}</h2>
                                    }
                                    secondaryText={
                                        <div>
                                            <div>Start date: <em>{moment(new Date(event.startDate)).format('LL')}</em></div>
                                            <div>End date: <em>{moment(new Date(event.endDate)).format('LL')}</em></div>
                                        </div>
                                    }
                                    secondaryTextLines={2}
                                    rightIconButton={
                                        <IconButton
                                            onClick={() => this.deleteEvent(event.id)}
                                        >
                                            <i className="material-icons">delete</i>
                                        </IconButton>
                                    }
                                />
                            )
                        })
                    }
                </List>
            </Paper>
        );
    }
    render() {
        return(
            <div className="App">
                <div className="title">
                    <h1 style={{textAlign: 'center'}}>Lindy Timeline</h1>
                </div>
                <Paper style={paperStyle} zDepth={1} >
                    <div className="form-inline">
                        <div className="form-group">
                            <TextField
                                hintText="Event Title"
                                onChange={e => this.setState({title: e.target.value})}
                            />
                            <br />
                            <DatePicker
                                hintText="Start Date" openToYearSelection={true}
                                onChange={(date) => {this.setState({startDate: date})}}
                            />
                            <br />
                            <DatePicker
                                hintText="End Date"
                                openToYearSelection={true}
                                onChange={(date) => {this.setState({endDate: date})}}
                            />
                            <br />
                        </div>
                        <RaisedButton
                            label="Add Event"
                            primary={true}
                            style={{margin: 12}}
                            onClick={() => this.addEvent()}
                        />
                    </div>
                </Paper>
                {
                    this.renderEvents()
                }
                <Paper style={paperStyle} zDepth={1} >
                <RaisedButton
                    label="Clear Events"
                    secondary={true}
                    style={{margin: 12, textAlign: 'center'}}
                    onClick={() => this.props.clearEvents()}
                />
                </Paper>
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