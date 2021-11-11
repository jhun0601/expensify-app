import React from "react";

import "react-dates/initialize";
// import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";

import { connect } from "react-redux";
import {
    setTextFilter,
    sortByDate,
    sortByAmount,
    setStartDate,
    setEndDate,
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null,
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    onSortChange = (e) => {
        if (e.target.value === "date") {
            this.props.sortByDate();
        } else if (e.target.value === "amount") {
            this.props.sortByAmount();
        }
    };
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Search expenses"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select
                            value={this.props.filters.sortBy}
                            className="select"
                            onChange={this.onSortChange}
                        >
                            <option value="amount">Amount</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            startDateId="start"
                            endDateId="end"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters,
});
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortbyDate: () => dispatch(sortByDate()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
