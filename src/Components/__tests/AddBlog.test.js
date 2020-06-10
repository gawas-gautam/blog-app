import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
//import "react-testing-library/cleanup-after-each";
import "@testing-library/jest-dom";
import { reducer as formReducer } from "redux-form";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
import AddBlog from "../AddBlog";

const server = setupServer(
  rest.post("/users/new", (req, res, ctx) => {
    return res(ctx.json({ ok: false }));
  })
);

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(combineReducers({ form: formReducer }), initialState),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

const formData = {
  title: "blog for python data structure",
  blog_category: "science",
  blog_content: " sample text",
};
//const { getByLabelText, getByTestId, debug } = renderWithRedux(<AddBlog />);

it("should fill up Add Blog form", () => {
  //let getByTestId;
  afterEach(cleanup);
  //   beforeEach(() => {
  //     ({ getByTestId } = renderWithRedux(<AddBlog />));
  //   });
  const { getByLabelText, getByTestId, debug } = renderWithRedux(<AddBlog />);
  fireEvent.change(getByTestId("blog_content"), {
    target: { value: formData.blog_content },
  });

  fireEvent.change(getByTestId("blog_category"), {
    target: { value: formData.blog_category },
  });

  fireEvent.change(getByTestId("title"), {
    target: { value: formData.title },
  });

  fireEvent.click(screen.getByText(/submit/i));
  expect(getByTestId("addblog")).toHaveFormValues(formData);

  debug();
});

test("handles server exceptions", async () => {
  afterEach(cleanup);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const { getByLabelText, getByTestId, debug } = renderWithRedux(<AddBlog />);
  // mock the server error response for this test suite only.

  server.use(
    rest.post("/users/new", (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ ok: false }));
    })
  );

  fireEvent.change(getByTestId("blog_content"), {
    target: { value: formData.blog_content },
  });

  fireEvent.change(getByTestId("blog_category"), {
    target: { value: formData.blog_category },
  });

  fireEvent.change(getByTestId("title"), {
    target: { value: formData.title },
  });

  fireEvent.click(screen.getByText(/submit/i));
  // wait for the error message
  const alert = await screen.findByRole("alert");

  //  expect(alert).toHaveTextContent(/Fail to add please try again!!!/i);
  expect(alert.textContent).toMatch(/Fail to add please try again!!!/i);
});
