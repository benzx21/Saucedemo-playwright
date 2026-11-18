import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  get username() { return this.byTestId('username'); }
  get password() { return this.byTestId('password'); }
  get loginButton() { return this.byTestId('login-button'); }
  get error() { return this.byTestId('error'); }

  async open() {
    await this.goto('/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
