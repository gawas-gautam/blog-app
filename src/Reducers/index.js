import { combineReducers } from "redux";
import { blogReducer } from "./addBlogReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  BlogData: blogReducer,
  form: formReducer,
});
