import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Freelancer, Job, Comment } from "../types/freelancer";

// Get saved freelancers from localStorage
const getSavedFreelancers = (): number[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("savedFreelancers");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

interface SearchFilters {
  name: string;
  city: string;
  minJobs: number;
  maxJobs: number;
  savedOnly: boolean;
}

interface FreelancerState {
  freelancers: Freelancer[];
  savedFreelancers: number[];
  loading: boolean;
  error: string | null;
  jobs: Job[];
  comments: Comment[];
  searchFilters: SearchFilters;
  currentFreelancer: Freelancer | null;
  currentFreelancerJobs: Job[];
}

const initialState: FreelancerState = {
  freelancers: [],
  savedFreelancers: getSavedFreelancers(),
  loading: false,
  error: null,
  jobs: [],
  comments: [],
  searchFilters: {
    name: "",
    city: "",
    minJobs: 0,
    maxJobs: 100,
    savedOnly: false,
  },
  currentFreelancer: null,
  currentFreelancerJobs: [],
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

export const fetchSingleFreelancer = createAsyncThunk(
  "freelancer/fetchSingleFreelancer",
  async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return await response.json();
  }
);

export const fetchFreelancerJobs = createAsyncThunk(
  "freelancer/fetchFreelancerJobs",
  async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return await response.json();
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
      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "savedFreelancers",
          JSON.stringify(state.savedFreelancers)
        );
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
      })
      .addCase(fetchSingleFreelancer.fulfilled, (state, action) => {
        state.currentFreelancer = action.payload;
      })
      .addCase(fetchFreelancerJobs.fulfilled, (state, action) => {
        state.currentFreelancerJobs = action.payload;
      });
  },
});

export const { toggleSaveFreelancer, updateSearchFilters } =
  freelancerSlice.actions;
export default freelancerSlice.reducer;
