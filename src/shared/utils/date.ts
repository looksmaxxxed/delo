const DATE_INPUT_VALUE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function formatDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function isDateInputValue(value: string | undefined): value is string {
  if (!value || !DATE_INPUT_VALUE_PATTERN.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && formatDateInputValue(date) === value;
}
