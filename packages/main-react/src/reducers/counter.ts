type ActionType<T = any> = Partial<{
  type: string;
  payload: T;
}>;

const counter = (state = 1, action: ActionType = {}) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

export default counter;
