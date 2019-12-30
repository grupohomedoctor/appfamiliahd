export const Types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_DEFAULT: 'LOGIN_DEFAULT',
};

const INITIAL_STATE = {
  data: null,
  cpf: null,
  password: null,
  error: false,
  loading: false,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        cpf: action.payload.cpf,
        password: action.payload.password,
        loading: true,
        error: false,
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  loginRequest: (eitherEmailOrCpf, password) => ({
    type: Types.LOGIN_REQUEST,
    payload: {
      eitherEmailOrCpf,
      password,
    },
  }),

  loginSuccess: data => ({
    type: Types.LOGIN_SUCCESS,
    payload: {
      data,
    },
  }),

  loginFailure: () => ({
    type: Types.LOGIN_FAILURE,
  }),

  default: () => ({
    type: Types.LOGIN_DEFAULT,
  }),
};
