export const ROUTES = {
  login: "Login",
  signUp: "SignUp",
  categories: "Categories",
  cards: {
    name: "Cards",
    params: (categoryId) => ({ categoryId }),
  },
};
