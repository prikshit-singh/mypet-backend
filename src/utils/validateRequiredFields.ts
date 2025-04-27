function validateRequiredFields(
  fields: string[],
  body: Record<string, any>
): { success: boolean; missingFields?: string[] } {
  const missingFields = fields.filter(field => body[field] === undefined);

  if (missingFields.length > 0) {
    return {
      success: false,
      missingFields,
    };
  }

  return {
    success: true,
  };
}

export default validateRequiredFields;
