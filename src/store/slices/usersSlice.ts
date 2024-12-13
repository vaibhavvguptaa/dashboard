import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UsersState, User } from '../../types';

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  deletedUsers: 0,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // Mock API call
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', status: 'active', region: 'North India', registrationDate: '2024-01-15' },
        { id: 2, name: 'Ishaan Patel', email: 'ishaan@example.com', status: 'active', region: 'West India', registrationDate: '2024-02-20' },
        { id: 3, name: 'Maya Gupta', email: 'maya@example.com', status: 'active', region: 'North India', registrationDate: '2024-03-10' },
        { id: 4, name: 'Ananya Rao', email: 'ananya@example.com', status: 'inactive', region: 'South India', registrationDate: '2024-01-05' },
        { id: 5, name: 'Rohan Singh', email: 'rohan@example.com', status: 'active', region: 'East India', registrationDate: '2024-04-12' },
        { id: 6, name: 'Priya Verma', email: 'priya@example.com', status: 'inactive', region: 'West India', registrationDate: '2024-02-28' },
        { id: 7, name: 'Aditya Mehta', email: 'aditya@example.com', status: 'active', region: 'North India', registrationDate: '2024-01-22' },
        { id: 8, name: 'Neha Kumar', email: 'neha@example.com', status: 'active', region: 'South India', registrationDate: '2024-03-15' },
        { id: 9, name: 'Amit Bhargava', email: 'amit@example.com', status: 'inactive', region: 'East India', registrationDate: '2024-01-30' },
        { id: 10, name: 'Sanya Khanna', email: 'sanya@example.com', status: 'active', region: 'North India', registrationDate: '2024-04-01' },
        { id: 11, name: 'Vikram Yadav', email: 'vikram@example.com', status: 'active', region: 'West India', registrationDate: '2024-05-15' },
        { id: 12, name: 'Rhea Soni', email: 'rhea@example.com', status: 'inactive', region: 'South India', registrationDate: '2024-03-20' },
        { id: 13, name: 'Dev Patel', email: 'dev@example.com', status: 'active', region: 'East India', registrationDate: '2024-06-10' },
        { id: 14, name: 'Shivani Joshi', email: 'shivani@example.com', status: 'active', region: 'North India', registrationDate: '2024-02-05' },
        { id: 15, name: 'Karan Gupta', email: 'karan@example.com', status: 'inactive', region: 'West India', registrationDate: '2024-04-25' },
        { id: 16, name: 'Sneha Reddy', email: 'sneha@example.com', status: 'active', region: 'South India', registrationDate: '2024-05-02' },
        { id: 17, name: 'Manish Kumar', email: 'manish@example.com', status: 'inactive', region: 'East India', registrationDate: '2024-03-03' },
        { id: 18, name: 'Tanya Deshmukh', email: 'tanya@example.com', status: 'active', region: 'West India', registrationDate: '2024-06-17' },
        { id: 19, name: 'Siddharth Gupta', email: 'siddharth@example.com', status: 'active', region: 'North India', registrationDate: '2024-01-18' },
        { id: 20, name: 'Kavya Bhatia', email: 'kavya@example.com', status: 'inactive', region: 'South India', registrationDate: '2024-04-05' }
      ]);
    }, 1000);
  });
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.deletedUsers += 1;
    },
    filterUsers: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredUsers = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 5);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { deleteUser, filterUsers, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
