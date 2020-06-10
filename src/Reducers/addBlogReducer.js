const initialstate = {
  employees: [],
};

export const blogReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return {
        ...state,
      };
    case "ADD_Blog":
      return {
        ...state,
        employees: state.employees.concat(action.payload),
      };
    case "EDIT_BLOG":
      return {
        ...state,
        employees: state.employees.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                employeeName: action.payload.employeeName,
                employeeDepartment: action.payload.employeeDepartment,
              }
            : content
        ),
      };
    case "DELETE_BLOG":
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
