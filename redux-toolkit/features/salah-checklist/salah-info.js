import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {
    fardh_fajr: false,
    fardh_duhr: false,
    fardh_asr: false,
    fardh_maghrib: false,
    fardh_isha: false,
    sunnah_fajr: false,
    sunnah_duhr: false,
    sunnah_asr: false,
    sunnah_maghrib: false,
    sunnah_isha: false,
    sunnah_taraweeh: false,
    sunnah_tahajjud: false,
    sunnah_duha: false,
  },
};

export const salahInfoSlice = createSlice({
  name: 'salahInfoSlice',
  initialState: initialState,
  reducers: {
    setAllSalahInfo: (state, action) => {
      state.value = action.payload;
    },
    setSalahInfo: (state, action) => {
      const {field, value} = action.payload;

      const updatedState = {...state.value, [field]: value};

      return {...state, value: updatedState};
    },
    resetSalahInfo: state => {
      state.value = {
        fardh_fajr: false,
        fardh_duhr: false,
        fardh_asr: false,
        fardh_maghrib: false,
        fardh_isha: false,
        sunnah_fajr: false,
        sunnah_duhr: false,
        sunnah_asr: false,
        sunnah_maghrib: false,
        sunnah_isha: false,
        sunnah_taraweeh: false,
        sunnah_tahajjud: false,
        sunnah_duha: false,
      };
    },
  },
});

export const {setAllSalahInfo, setSalahInfo, resetSalahInfo} =
  salahInfoSlice.actions;

export const getSalahInfo = state => {
  //   console.log('salah-info-slice: get salah info: ', state.salahInfo);
  return state.salahInfo.value;
};

export default salahInfoSlice.reducer;
