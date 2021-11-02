import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../../actions/filters";
import moment from "moment";
test("Should generate set start date object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    start_date: moment(0),
  });
});

test("Should generate set end date object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    end_date: moment(0),
  });
});

test("Should generate set text object with text value", () => {
  const text = "Something";
  const action = setTextFilter(text);

  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text,
  });
});

test("Should generate set text object with default value", () => {
  const action = setTextFilter();

  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});
test("Should generate action object for sort of date", () => {
  expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" });
});
test("Should generate action object for sort of amount", () => {
  expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" });
});
