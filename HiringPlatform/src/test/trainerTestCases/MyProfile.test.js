import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyProfile from "./MyProfile";

test("renders correctly", () => {
  render(<MyProfile email="test@example.com" />);
  expect(screen.getByText("My Profile")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
});

test("clicking edit button toggles edit mode", () => {
  render(<MyProfile email="test@example.com" />);
  const editButton = screen.getByRole("button", { name: "Edit" });
  fireEvent.click(editButton);
  expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
});

test("validates email correctly", async () => {
  render(<MyProfile email="test@example.com" />);
  const editButton = screen.getByRole("button", { name: "Edit" });
  fireEvent.click(editButton);
  const emailInput = screen.getByPlaceholderText("Email");
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  await waitFor(() =>
    expect(screen.getByText("Invalid email address")).toBeInTheDocument()
  );
});

// Add more test cases as needed
