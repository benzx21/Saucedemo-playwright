export const PASSWORD = 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  glitch: { username: 'performance_glitch_user', password: PASSWORD },
  error: { username: 'error_user', password: PASSWORD },
  visual: { username: 'visual_user', password: PASSWORD },
} as const;

export const checkoutInfo = {
  firstName: 'Benson1',
  lastName: 'Tester',
  postalCode: 'M1 1AA',
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  onesie: 'Sauce Labs Onesie',
} as const;

// Data driven login cases
export const invalidLogins = [
  { name: 'wrong password', username: 'standard_user', password: 'wrong', error: 'Username and password do not match any user in this service' },
  { name: 'unknown user', username: 'nobody', password: PASSWORD, error: 'Username and password do not match any user in this service' },
  { name: 'empty username', username: '', password: PASSWORD, error: 'Username is required' },
  { name: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
  { name: 'locked out user', username: 'locked_out_user', password: PASSWORD, error: 'Sorry, this user has been locked out' },
];
