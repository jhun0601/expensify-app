export const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

export const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

export const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

export const setStartDate = (start_date = undefined) => ({
  type: "SET_START_DATE",
  start_date,
});

export const setEndDate = (end_date = undefined) => ({
  type: "SET_END_DATE",
  end_date,
});
