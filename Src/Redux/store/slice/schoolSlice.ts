import {createSlice} from '@reduxjs/toolkit';
import {
  fetchMySchool,
  fetchMonthlyAttendance,
    fetchStudentHomework,
} from '../../api/schoolApiMethods';

interface SchoolState {
  school: any;
  monthlyAttendance: any[];
  loading: boolean;
    homeworks: any[];
  error: string | null;
}

const initialState: SchoolState = {
  school: null,
  monthlyAttendance: [],
    homeworks: [],
  loading: false,
  error: null,
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder

      // ================= SCHOOL PROFILE =================

      .addCase(fetchMySchool.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMySchool.fulfilled, (state, action) => {
        state.loading = false;
        state.school = action.payload;
      })

      .addCase(fetchMySchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ================= MONTHLY ATTENDANCE =================

      .addCase(
        fetchMonthlyAttendance.pending,
        state => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchMonthlyAttendance.fulfilled,
        (state, action) => {
          state.loading = false;

          state.monthlyAttendance =
            action.payload?.data || [];

          console.log(
            '📅 ATTENDANCE STORE =>',
            state.monthlyAttendance,
          );
        },
      )

      .addCase(
        fetchMonthlyAttendance.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
           )
           .addCase(
  fetchStudentHomework.pending,
  state => {
    state.loading = true;
    state.error = null;
  },
)
.addCase(
  fetchStudentHomework.fulfilled,
  (state, action) => {
    state.loading = false;

    state.homeworks =
      action.payload?.data || [];

    console.log(
      '📚 HOMEWORK STORE =>',
      state.homeworks,
    );
  },
)
.addCase(
  fetchStudentHomework.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  },
);  
}
});

export default schoolSlice.reducer;