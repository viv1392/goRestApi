const getUserSchema={
  type: 'array',
  items: {
    type: 'object',
    required: ['id', 'name', 'email', 'gender', 'status'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      gender: { type: 'string', enum: ['male', 'female'] },
      status: { type: 'string', enum: ['active', 'inactive'] }
    },
    additionalProperties: true
  }
};

const schemaCreateUser = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    gender: { type: "string", enum: ["male", "female"] },
    status: { type: "string", enum: ["active", "inactive"] }
  },
  required: ["name", "email", "gender", "status"]
};

module.exports={getUserSchema,schemaCreateUser};
    
