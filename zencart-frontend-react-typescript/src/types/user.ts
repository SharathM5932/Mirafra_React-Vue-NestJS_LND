export type UserRole = "buyer" | "seller";

export interface UserRoleState {
  userCurrentRole: UserRole;
}

export interface ProfileCardProps {
  title: string;
  description: string;
}

export interface AddressFormData {
  country: string;
  fullName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber: string;
}

export interface AddressCardProps {
  _id: string;
  fullName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNumber: string;
  createdAt: string | Date;
  modifiedAt: string | Date;
}

export interface UserState {
  user: any | null;
  address: any | null;
}

export interface ContactFormData {
  email: string;
  description: string;
}

export interface User {
  _id?: string;
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  role?: string[];
}

export interface Address {
  _id: string;
  fullName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNumber: string;
  createdAt: string;
  modifiedAt: string;
}
