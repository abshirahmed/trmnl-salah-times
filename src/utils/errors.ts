import { HttpStatusCode } from 'axios';

export class CustomError extends Error {
  statusCode: HttpStatusCode;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Custom Bad Request Error
export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(400, message);
    this.name = this.constructor.name;
  }
}

// Custom Unauthorized Error
export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

// Custom Forbidden Error
export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

// Custom Not Found Error
export class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

// Custom Conflict Error
export class ConflictError extends CustomError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

// Custom Internal Server Error
export class InternalServerError extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}
