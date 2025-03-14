import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Email or mật khẩu không đúng";
}

export class InActiveAccountError extends AuthError {
  static type = "Tài khoản chưa được kích hoạt";
}
export class AccountDeletedError extends AuthError {
  static type = "Tài khoản đã bị xóa";
}
export class AccountNotSuspensionError extends AuthError {
  static type = "Tài khoản không bị tạm khóa";
}
