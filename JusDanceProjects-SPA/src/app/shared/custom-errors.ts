import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat
  },
  {
    error: 'email',
    format: emailFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `${label} is vereist`;
}

export function emailFormat(label: string, error: any): string {
  return `${label} is geen correct email adres`;
}
