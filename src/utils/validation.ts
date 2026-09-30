type RequiredField = {
  value: string;
  label: string;
};

export function validateRequiredFields(
  fields: RequiredField[],
  isZh: boolean,
): boolean {
  const missingField = fields.find((field) => !field.value.trim());

  if (!missingField) return true;

  alert(
    isZh
      ? `請填寫「${missingField.label}」。`
      : `Please fill in "${missingField.label}".`,
  );

  return false;
}

export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 12 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9\s]/.test(password)
  );
}