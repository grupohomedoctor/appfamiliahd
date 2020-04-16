export const Types = {
  REQUEST_GETVERSION: 'REQUEST_GETVERSION',
  SUCCESS_GETVERSION: 'SUCCESS_GETVERSION',
  FAILURE_GETVERSION: 'FAILURE_GETVERSION',
  REMOVE_GETVERSION: 'REMOVE_GETVERSION',
};

const INITIAL_STATE = {
  // IDAdmission: null,
  error: null,
  loading: false,
  // notifications: [],
  version: null,
  // data: null,
};

export default function getVersion(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST_GETVERSION:
      return {
        ...state,
        // IDAdmission: action.payload.IDAdmission,
        error: false,
        loading: true,
        // notifications: [],
        version: null,
        // version: [],
      };
    case Types.SUCCESS_GETVERSION:
      // console.log('version ducks');
      // console.log(action.payload);
      return {
        ...state,
        error: false,
        loading: false,
        // notifications: action.payload.notifications,
        version: action.payload.version,
      };
    case Types.FAILURE_GETVERSION:
      return {
        ...state,
        error: true,
        loading: false,
        // notifications: [],
        version: null,
      };
    case Types.REMOVE_GETVERSION:
      return {
        ...state,
        // notifications: state.notifications.filter(
        version: state.version.filter(
          version => version.value[1] !== action.payload.idNotification,
        ),
      };
    default:
      return state;
  }
}

export const Creators = {
  // getVersion: (IDAdmission) => ({
  getVersion: () => ({
    type: Types.REQUEST_GETVERSION,
    payload: {
      // IDAdmission,
    },
  }),

  success: version => ({
    type: Types.SUCCESS_GETVERSION,
    payload: {
      version,
    },
  }),

  failure: () => ({
    type: Types.FAILURE_GETVERSION,
  }),

  remove: idNotification => ({
    type: Types.REMOVE_GETVERSION,
    payload: {
      idNotification,
    },
  }),

  default: () => ({
    type: Types.DEFAULT_GETVERSION,
  }),
};
