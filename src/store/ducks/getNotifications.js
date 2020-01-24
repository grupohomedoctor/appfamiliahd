export const Types = {
  REQUEST_GETNOTIFICATIONS: 'REQUEST_GETNOTIFICATIONS',
  SUCCESS_GETNOTIFICATIONS: 'SUCCESS_GETNOTIFICATIONS',
  FAILURE_GETNOTIFICATIONS: 'FAILURE_GETNOTIFICATIONS',
  REMOVE_GETNOTIFICATIONS: 'REMOVE_GETNOTIFICATIONS',
};

const INITIAL_STATE = {
  IDAdmission: null,
  error: null,
  loading: false,
  notifications: [],
};

export default function getNotifications(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST_GETNOTIFICATIONS:
      return {
        ...state,
        IDAdmission: action.payload.IDAdmission,
        error: false,
        loading: true,
        notifications: [],
      };
    case Types.SUCCESS_GETNOTIFICATIONS:
      // console.log('notification ducks');
      // console.log(action.payload.notifications);
      return {
        ...state,
        error: false,
        loading: false,
        notifications: action.payload.notifications,
      };
    case Types.FAILURE_GETNOTIFICATIONS:
      return {
        ...state,
        error: true,
        loading: false,
        notifications: [],
      };
    case Types.REMOVE_GETNOTIFICATIONS:
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
  getNotifications: IDAdmission => ({
    type: Types.REQUEST_GETNOTIFICATIONS,
    payload: {
      IDAdmission,
    },
  }),

  success: notifications => ({
    type: Types.SUCCESS_GETNOTIFICATIONS,
    payload: {
      notifications,
    },
  }),

  failure: () => ({
    type: Types.FAILURE_GETNOTIFICATIONS,
  }),

  remove: idNotification => ({
    type: Types.REMOVE_GETNOTIFICATIONS,
    payload: {
      idNotification,
    },
  }),

  default: () => ({
    type: Types.DEFAULT_GETNOTIFICATIONS,
  }),
};
