export interface UserSignUpDto {
  id?: string;
  email: string;
  password: string;
  firstName: string;
}

export interface UserSignInDto {
  email: string;
  password: string;
}