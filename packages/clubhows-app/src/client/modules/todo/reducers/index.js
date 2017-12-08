const defaultState = {
  view: { form: null }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LIST_FORM':
      return {
        ...state,
        view: action.value
      };

    default:
      return state;
  }
};
