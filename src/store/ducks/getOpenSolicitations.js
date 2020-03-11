export const Types = {
  REQUEST_GETOPENSOLICITATIONS: 'REQUEST_GETOPENSOLICITATIONS',
  SUCCESS_GETOPENSOLICITATIONS: 'SUCCESS_GETOPENSOLICITATIONS',
  FAILURE_GETOPENSOLICITATIONS: 'FAILURE_GETOPENSOLICITATIONS',
};

const INITIAL_STATE = {
  IDAdmission: null,
  error: null,
  loading: false,
  solicitations: false,
};

export default function getOpenSolicitations(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST_GETOPENSOLICITATIONS:
      return {
        ...state,
        IDAdmission: action.payload.IDAdmission,
        error: false,
        loading: true,
      };
    case Types.SUCCESS_GETOPENSOLICITATIONS:
      return {
        ...state,
        error: false,
        loading: false,
        solicitations: action.payload.solicitations,
      };
    case Types.FAILURE_GETOPENSOLICITATIONS:
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
  getOpenSolicitations: IDAdmission => ({
    type: Types.REQUEST_GETOPENSOLICITATIONS,
    payload: {
      IDAdmission,
    },
  }),

  success: solicitations => ({
    type: Types.SUCCESS_GETOPENSOLICITATIONS,
    payload: {
      solicitations,
    },
  }),

  failure: () => ({
    type: Types.FAILURE_GETOPENSOLICITATIONS,
  }),

  default: () => ({
    type: Types.DEFAULT_GETOPENSOLICITATIONS,
  }),
};
