export const Types = {
  FORGOT_REQUEST: 'FORGOT_REQUEST',
  FORGOT_SUCCESS: 'FORGOT_SUCCESS',
  FORGOT_FAILURE: 'FORGOT_FAILURE',
  FORGOT_DEFAULT: 'FORGOT_DEFAULT',
};

const INITIAL_STATE = {
  error: null,
  loading: false,
  success: false,
};

export default function forgot(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FORGOT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.FORGOT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case Types.FORGOT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case Types.FORGOT_DEFAULT:
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
  forgotRequest: cpf => ({
    type: Types.FORGOT_REQUEST,
    payload: {
      cpf,
    },
  }),

  forgotSuccess: () => ({
    type: Types.FORGOT_SUCCESS,
  }),

  forgotFailure: error => ({
    type: Types.FORGOT_FAILURE,
    payload: {
      error,
    },
  }),

  forgotDefault: () => ({
    type: Types.FORGOT_DEFAULT,
  }),
};
