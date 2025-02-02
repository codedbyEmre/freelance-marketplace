import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchFilters from "../SearchFilters";
import freelancerReducer from "../../store/freelancerSlice";

const createTestStore = () =>
  configureStore({
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
          city: "",
          minJobs: 0,
          maxJobs: 100,
          savedOnly: false,
        },
        currentFreelancer: null,
        currentFreelancerJobs: [],
      },
    },
  });

describe("SearchFilters", () => {
  it("renders all filter inputs", () => {
    render(
      <Provider store={createTestStore()}>
        <SearchFilters />
      </Provider>
    );

    expect(screen.getByLabelText(/search by name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search by city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("updates name filter on input change", () => {
    render(
      <Provider store={createTestStore()}>
        <SearchFilters />
      </Provider>
    );

    const nameInput = screen.getByLabelText(/search by name/i);
    fireEvent.change(nameInput, { target: { value: "John" } });
    expect(nameInput).toHaveValue("John");
  });

  it("updates city filter on input change", () => {
    render(
      <Provider store={createTestStore()}>
        <SearchFilters />
      </Provider>
    );

    const cityInput = screen.getByLabelText(/search by city/i);
    fireEvent.change(cityInput, { target: { value: "New York" } });
    expect(cityInput).toHaveValue("New York");
  });

  it("toggles saved only switch", () => {
    render(
      <Provider store={createTestStore()}>
        <SearchFilters />
      </Provider>
    );

    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();
  });
});
