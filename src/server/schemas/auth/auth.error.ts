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

export { name, email, password };
