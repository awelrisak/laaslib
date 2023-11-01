namespace forms {
  namespace signup {
    interface IUser {
      firstName: string;
      middleName?: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
  }
}
