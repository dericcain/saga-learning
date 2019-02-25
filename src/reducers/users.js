import { Types } from '../actions/users';

const initialState = {
  items: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS:
      return action.payload.items;
    default:
      return state;
  }
}
