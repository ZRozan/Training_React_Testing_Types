import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

// Unit Testing

test("on initial render, pay button should be disabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "1" }} receiver={{ id: "1" }} />);

  //screen.debug();
  //screen.getByRole("");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});

test("pay button should be enabled after amount and note is entered", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "1" }} receiver={{ id: "1" }} />);

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  //screen.getByRole("");
  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});

// Integration Testing

test("pay button should be disabled and activate after amount and note is entered", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "1" }} receiver={{ id: "1" }} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  //screen.getByRole("");
  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
