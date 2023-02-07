const errorMiddleware = (err, req, res, next) => {
  let message = "Internal Server Error";
  let code = 500;

  switch (err.name) {
    case "SequelizeValidationError":
      message = err.errors[0].message;
      code = 400;
      break;
    case "SequelizeUniqueConstraintError":
      message = err.errors[0].message;
      code = 400;
      break;
    case "EmailIsEmpty":
      message = "Email is required";
      code = 400;
      break;
    case "PasswordIsEmpty":
      message = "Password is required";
      code = 400;
      break;
    case "NameIsEmpty":
      message = "Name is required";
      code = 400;
      break;
    case "InvalidCredentials":
      message = "Invalid email or password";
      code = 400;
      break;
    case "Unauthorized":
      message = "You are not authorized";
      code = 401;
      break;
    case "ContentNotFound":
      message = "Content not found";
      code = 404;
      break;
    case "UserNotFound":
      message = "User not found";
      code = 404;
      break;
    case "AlreadyFollowed":
      message = "You already followed this user";
      code = 400;
  }

  res.status(code).json({ message });
};

module.exports = errorMiddleware;
