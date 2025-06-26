export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface UserResponse {
  message: string;
  users: User[];
}