import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import ExpenseItemList from "../../components/ExpenseItemList";
import expenses from "../fixtures/expenses";

test("Should render expense list item correctly ", () => {
  const wrapper = shallow(<ExpenseItemList {...expenses[0]} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
