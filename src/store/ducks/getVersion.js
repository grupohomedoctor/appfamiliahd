export const Types = {
  REQUEST_GETVERSION: 'REQUEST_GETVERSION',
  SUCCESS_GETVERSION: 'SUCCESS_GETVERSION',
  FAILURE_GETVERSION: 'FAILURE_GETVERSION',
  REMOVE_GETVERSION: 'REMOVE_GETVERSION',
};

const INITIAL_STATE = {
  IDAdmission: null,
  error: null,
  loading: false,
  // notifications: [],
  notifications: null,
  // data: null,
};

export default function getVersion(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST_GETVERSION:
      return {
        ...state,
        IDAdmission: action.payload.IDAdmission,
        error: false,
        loading: true,
        // notifications: [],
        notifications: null,
        // version: [],
      };
    case Types.SUCCESS_GETVERSION:
      console.log('version ducks');
      console.log(action.payload);
      return {
        ...state,
        error: false,
        loading: false,
        notifications: action.payload.notifications,
      };
    case Types.FAILURE_GETVERSION:
      return {
        ...state,
        error: true,
        loading: false,
        // notifications: [],
        notifications: null,
      };
    case Types.REMOVE_GETVERSION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification =>
            notification.value[1] !== action.payload.idNotification,
        ),
      };
    default:
      return state;
  }
}

export const Creators = {
  getVersion: IDAdmission => ({
    type: Types.REQUEST_GETVERSION,
    payload: {
      IDAdmission,
    },
  }),

  success: notifications => ({
    type: Types.SUCCESS_GETVERSION,
    payload: {
      notifications,
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
