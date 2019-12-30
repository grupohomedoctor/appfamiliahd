export const Types = {
  SET_DATA: 'SET_DATA_STORAGE',
  CLEAR_DATA: 'CLEAR_DATA_STORAGE',
};

const INITIAL_STATE = {
  userName: null,
  IDAdmission: null,
  patientsAddress: null,
};

export default function storage(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_DATA:
      return {
        ...state,
        userName: action.payload.userName,
        IDAdmission: action.payload.IDAdmission,
        patientsAddress: action.payload.patientsAddress,
      };
    case Types.CLEAR_DATA:
      return {
        ...state,
        userName: null,
        IDAdmission: null,
        patientsAddress: null,
      };
    default:
      return state;
  }
}

export const Creators = {
  setDataStorage: (userName, IDAdmission, patientsAddress) => ({
    type: Types.SET_DATA,
    payload: {
      userName,
      IDAdmission,
      patientsAddress,
    },
  }),

  clearDataStorage: () => ({
    type: Types.CLEAR_DATA,
  }),
};
