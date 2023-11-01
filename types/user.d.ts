interface IUser {
    firstName?: string;
    name?: string;
    middleName?: string;
    lastName?: string;
    role?: UserRole;
    email?: string;
    isEmailVerified?: boolean;
    email_verified?: boolean;
    emailverified?: boolean;
    phoneNumber?: number;
    isPhoneNumberVerified?: boolean;
    username?: string;
    hashedPassword?: string;
    gender?: Gender;
    birthdate?: Date;
    images?: {
      profile?: string;
      };
    image?: string;
    bio?: string;
    coordinates?: string[];
    homeTown?: string;
    livesIn?: string;
    onboarded?: boolean;
  }