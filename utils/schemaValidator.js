import Ajv from 'ajv';

class SchemaVladation{
  constructor() {
    // AJV instance
    this.ajv = new Ajv({ allErrors: true, strict: false });
  }
  
  validateSchema(schema, data) {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error('❌ Schema validation errors:', validate.errors);
      throw new Error(
        `Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`
      );
    }

    console.log('✅ Schema validation passed');
    return true;
  }
}


module.exports = { SchemaVladation };