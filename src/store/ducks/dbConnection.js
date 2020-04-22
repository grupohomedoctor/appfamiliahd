export const Types = {
  REQUEST_DB: 'POST_REQUEST',
  SUCCESS_DB: 'POST_SUCCESS',
  FAILURE_DB: 'POST_FAILURE',
};

const INITIAL_STATE = {
  IDAdmission: null,
  base: null,
  idSubject: null,
  description: null,
  requesterName: null,
  error: false,
  loading: false,
  files: null,
};

export default function Post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST_DB:
      return {
        ...state,
        IDAdmission: action.payload.IDAdmission,
        base: action.payload.base,
        idSubject: action.payload.idSubject,
        description: action.payload.description,
        requesterName: action.payload.requesterName,
        error: false,
        loading: true,
        files: action.payload.files,
      };
    case Types.SUCCESS_DB:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.FAILURE_DB:
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
  Post: (IDAdmission, base, idSubject, description, requesterName, files) => ({
    type: Types.REQUEST_DB,
    payload: {
      IDAdmission,
      base,
      idSubject,
      description,
      requesterName,
      files,
    },
  }),

  postSuccess: data => ({
    type: Types.SUCCESS_DB,
    payload: {
      data,
    },
  }),

  postFailure: () => ({
    type: Types.FAILURE_DB,
  }),

  default: () => ({
    type: Types.DEFAULT_DB,
  }),
};
