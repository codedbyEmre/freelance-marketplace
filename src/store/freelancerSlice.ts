import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Freelancer, Job, Comment } from "../types/freelancer";

interface FreelancerState {
  freelancers: Freelancer[];
  savedFreelancers: number[];
  loading: boolean;
  error: string | null;
  jobs: Job[];
  comments: Comment[];
  searchFilters: {
    name: string;
    minJobs: number;
    maxJobs: number;
    city: string;
    savedOnly: boolean;
  };
}

const initialState: FreelancerState = {
  freelancers: [],
  savedFreelancers: [],
  loading: false,
  error: null,
  jobs: [],
  comments: [],
  searchFilters: {
    name: "",
    minJobs: 0,
    maxJobs: 100,
    city: "",
    savedOnly: false,
  },
};

export const fetchFreelancers = createAsyncThunk(
  "freelancer/fetchFreelancers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);

export const fetchJobs = createAsyncThunk("freelancer/fetchJobs", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
});

export const fetchComments = createAsyncThunk(
  "freelancer/fetchComments",
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const data = await response.json();
    return data;
  }
);

const freelancerSlice = createSlice({
  name: "freelancer",
  initialState,
  reducers: {
    toggleSaveFreelancer: (state, action: PayloadAction<number>) => {
      const freelancerId = action.payload;
      const index = state.savedFreelancers.indexOf(freelancerId);
      if (index === -1) {
        state.savedFreelancers.push(freelancerId);
      } else {
        state.savedFreelancers.splice(index, 1);
      }
    },
    updateSearchFilters: (
      state,
      action: PayloadAction<Partial<typeof state.searchFilters>>
    ) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreelancers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFreelancers.fulfilled, (state, action) => {
        state.loading = false;
        state.freelancers = action.payload;
      })
      .addCase(fetchFreelancers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch freelancers";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = [...state.comments, ...action.payload];
      });
  },
});

export const { toggleSaveFreelancer, updateSearchFilters } =
  freelancerSlice.actions;
export default freelancerSlice.reducer;
