export const customersReducer = (state, action) => {
  switch (action.type) {
    case "EXCEL_LIST_REQUEST":
      return {
        loading: true,
     };
    case "EXCEL_LIST_SUCCESS":
      return {
        loading: false,
      data: action.payload,
      };
    case "EXCEL_LIST_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
