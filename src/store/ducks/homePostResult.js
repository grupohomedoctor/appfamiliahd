export const Types = {
  HOMEPOSTRESULT_SUCCESS: 'HOMEPOSTRESULT_SUCCESS',
  HOMEPOSTRESULT_FAILURE: 'HOMEPOSTRESULT_FAILURE',
  HOMEPOSTRESULT_DEFAULT: 'HOMEPOSTRESULT_DEFAULT',
};

const INITIAL_STATE = {
  success: false,
  error: false,
};

export default function homePostResult(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.HOMEPOSTRESULT_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
      };
    case Types.HOMEPOSTRESULT_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
      };
    case Types.HOMEPOSTRESULT_DEFAULT:
      return {
        ...state,
        success: false,
        error: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  success: () => ({
    type: Types.HOMEPOSTRESULT_SUCCESS,
  }),

  failure: () => ({
    type: Types.HOMEPOSTRESULT_FAILURE,
  }),

  default: () => ({
    type: Types.HOMEPOSTRESULT_DEFAULT,
  }),
};
