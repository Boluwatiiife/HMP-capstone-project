// this helps to be able to attach an authorId to the request object.

declare namespace Express {
    interface Request {
      authorId: string;
    }
  }
