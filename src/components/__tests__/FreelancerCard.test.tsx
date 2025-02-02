import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FreelancerCard from "../FreelancerCard";
import freelancerReducer from "../../store/freelancerSlice";

const mockFreelancer = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "1-234-567-8900",
  website: "johndoe.com",
  city: "New York",
  address: {
    street: "123 Main St",
    suite: "Apt 4B",
    city: "New York",
    zipcode: "10001",
  },
  company: {
    name: "Tech Corp",
    catchPhrase: "Innovation First",
    bs: "cutting-edge solutions",
  },
};

const mockStore = configureStore({
  reducer: {
    freelancer: freelancerReducer,
  },
  preloadedState: {
    freelancer: {
      freelancers: [],
      savedFreelancers: [],
      jobs: [],
      comments: [],
      loading: false,
      error: null,
      searchFilters: {
        name: "",
        minJobs: 0,
        maxJobs: 100,
        city: "",
        savedOnly: false,
      },
    },
  },
});

describe("FreelancerCard", () => {
  it("renders freelancer information correctly", () => {
    render(
      <Provider store={mockStore}>
        <FreelancerCard freelancer={mockFreelancer} jobCount={5} />
      </Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: 1-234-567-8900")).toBeInTheDocument();
    expect(screen.getByText("City: New York")).toBeInTheDocument();
    expect(screen.getByText("Completed Jobs: 5")).toBeInTheDocument();
  });

  it("toggles save button correctly", () => {
    render(
      <Provider store={mockStore}>
        <FreelancerCard freelancer={mockFreelancer} jobCount={5} />
      </Provider>
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(screen.getByText("Saved")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Saved"));
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
