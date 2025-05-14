export default class CustomError extends Error {
    public status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.name = 'CustomError';
  
      // Bu yerda prototipni to‘g‘ri o‘rnatamiz (TypeScript Error subclass uchun)
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  