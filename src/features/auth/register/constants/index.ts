import type { RegisterInput } from '@/shared/schemas/auth';

export const REGISTER_DEFAULT_VALUES: RegisterInput = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
  personalDataAccepted: false,
};
