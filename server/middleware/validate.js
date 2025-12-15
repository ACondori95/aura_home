/**
 * Generic validation middleware
 * @param {Object} schema - Joi validation schema
 * @param {String} source - Where to validate from ('body', 'query', 'params')
 * @returns {Function} - Express middleware
 */
const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const dataToValidate = req[source];

    const {error, value} = schema.validate(dataToValidate, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));

      return res
        .status(400)
        .json({error: "Error de validación", details: errors});
    }

    // Replace req.body with validated and sanitized data
    req[source] = value;
    next();
  };
};

module.exports = validate;
