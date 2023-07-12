const name = {
  required_error: "Name is required for signup ",
  invalid_type: "Name should be of the string data type",
  min_length: "Name should be longer than 2 Characters",
  max_length: "Name cannot be longer than 30 Characters",
};

const email = {
  required_error: "Email is required for signup ",
  invalid_type: "Email should be of the string data type",
  invalid_email: "Enter a valid email address",
  min_length: "Email should be longer than 5 Characters",
  max_length: "Email cannot be longer than 30 Characters",
};

const password = {
  required_error: "Password is required for signup ",
  invalid_type: "Password should be of the string data type",
  min_length: "Password should be longer than 8 Characters",
  max_length: "Password cannot be longer than 30 Characters",
};

const user_exists =
  "Sorry, the user account could not be created as a user with the same username or email address already exists in our system. Please choose a different username or email address";

const invalid_credentials =
  "We're sorry, but the credentials you provided are invalid. Please ensure that you have entered the correct username and password associated with your account";

const auth_provider =
  "This account has been created through an Auth Provider, please login through that provider";

export {
  name,
  email,
  password,
  user_exists,
  invalid_credentials,
  auth_provider,
};
