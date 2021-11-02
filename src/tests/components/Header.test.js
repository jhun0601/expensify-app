import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
// import ShallowRenderer from "react-test-renderer/shallow";

import Header from "../../components/Header";

test("Should render header correctly", () => {
  const wrapper = shallow(<Header />);

  expect(toJson(wrapper)).toMatchSnapshot();

  // expect(wrapper.find("h1").text()).toBe("Expensify");

  // const renderer = new ShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});
