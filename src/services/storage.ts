export default class StorageService {
  private static passwordKey = "tyler-password";

  public static getPassword() {
    return localStorage.getItem(this.passwordKey);
  }

  public static setPassword(pwd: string) {
    localStorage.setItem(this.passwordKey, pwd);
  }

  public static hasPassword() {
    return Boolean(localStorage.getItem(this.passwordKey));
  }
}