import {createSlice} from '@reduxjs/toolkit';
import { fetchAttendanceList, fetchStudentsAttendance } from '../../api/teacherApiMethods';


interface TeacherState {
  attendance: any[];
  loading: boolean;
    attendanceList: any[];
  error: string | null;
}

const initialState: TeacherState = {
  attendance: [],
   attendanceList: [],
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
    .addCase(
  fetchAttendanceList.pending,
  state => {
    state.loading = true;
  },
)

.addCase(
  fetchAttendanceList.fulfilled,
  (state, action) => {
    state.loading = false;

    state.attendanceList =
      action.payload?.data || [];

    console.log(
      '✅ ATTENDANCE LIST STORED =>',
      state.attendanceList,
    );
  },
)

.addCase(
  fetchAttendanceList.rejected,
  (state, action) => {
    state.loading = false;

    state.error =
      action.payload as string;
  },
)

      .addCase(
        fetchStudentsAttendance.pending,
        state => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchStudentsAttendance.fulfilled,
        (state, action) => {
          state.loading = false;

          state.attendance =
            action.payload?.data || [];

          console.log(
            '✅ ATTENDANCE STORED =>',
            state.attendance,
          );
        },
      )

      .addCase(
        fetchStudentsAttendance.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string;
        },
      );
  },
});

export default teacherSlice.reducer;