export const Types = {
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_FAILURE',
};

const INITIAL_STATE = {
  IDAdmission: null,
  error: false,
};

export default function update(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.UPDATE_REQUEST:
      return {
        ...state,
        IDAdmission: action.payload.IDAdmission,
      };
    case Types.UPDATE_SUCCESS:
      return {
        ...state,
        error: false,
      };
    case Types.UPDATE_FAILURE:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export const Creators = {
  update: IDAdmission => ({
    type: Types.UPDATE_REQUEST,
    payload: {
      IDAdmission,
    },
  }),

  updateSuccess: data => ({
    type: Types.UPDATE_SUCCESS,
    payload: {
      data,
    },
  }),

  updateFailure: () => ({
    type: Types.UPDATE_FAILURE,
  }),

  default: () => ({
    type: Types.UPDATE_DEFAULT,
  }),
};
