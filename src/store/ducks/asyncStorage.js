export const Types = {
  SET_DATA: 'SET_DATA_STORAGE',
  CLEAR_DATA: 'CLEAR_DATA_STORAGE',
};

const INITIAL_STATE = {
  userName: null,
  IDAdmission: null,
  patientsAddress: null,
  Base: null,
  pacienteNome: null,
  pacienteDataNasc: null,
};

export default function storage(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_DATA:
      return {
        ...state,
        userName: action.payload.userName,
        IDAdmission: action.payload.IDAdmission,
        patientsAddress: action.payload.patientsAddress,
        Base: action.payload.Base,
        pacienteNome: action.payload.pacienteNome,
        pacienteDataNasc: action.payload.pacienteDataNasc,
      };
    case Types.CLEAR_DATA:
      return {
        ...state,
        userName: null,
        IDAdmission: null,
        patientsAddress: null,
        Base: null,
        pacienteNome: null,
        pacienteDataNasc: null,
      };
    default:
      return state;
  }
}

export const Creators = {
  setDataStorage: (
    userName,
    IDAdmission,
    patientsAddress,
    Base,
    pacienteNome,
    pacienteDataNasc,
  ) => ({
    type: Types.SET_DATA,
    payload: {
      userName,
      IDAdmission,
      patientsAddress,
      Base,
      pacienteNome,
      pacienteDataNasc,
    },
  }),

  clearDataStorage: () => ({
    type: Types.CLEAR_DATA,
  }),
};
