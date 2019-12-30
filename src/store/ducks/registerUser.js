export const Types = {
  REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE',
  REGISTER_USER_DEFAULT: 'REGISTER_USER_DEFAULT',
};

const INITIAL_STATE = {
  error: null,
  loading: false,
  success: false,
};

export default function registerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case Types.REGISTER_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case Types.REGISTER_USER_DEFAULT:
      return {
        ...state,
        error: null,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  registerUserRequest: (
    name,
    cpf,
    email,
    password,
    namePatient,
    // emailPatient,
    birthPatient,
  ) => ({
    type: Types.REGISTER_USER_REQUEST,
    payload: {
      name,
      cpf,
      email,
      password,
      namePatient,
      // emailPatient,
      birthPatient,
    },
  }),

  registerUserSuccess: () => ({
    type: Types.REGISTER_USER_SUCCESS,
  }),

  registerUserFailure: error => ({
    type: Types.REGISTER_USER_FAILURE,
    payload: {
      error,
    },
  }),

  registerUserDefault: () => ({
    type: Types.REGISTER_USER_DEFAULT,
  }),
};
