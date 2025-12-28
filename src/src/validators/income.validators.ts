import Joi from 'joi';

export const createIncomeSourceSchema = Joi.object({
  name: Joi.string().min(1).max(255).required()
    .messages({
      'string.empty': 'Income source name is required',
      'string.max': 'Name must be less than 255 characters'
    }),

  monthly_amount: Joi.number().min(0).required()
    .messages({
      'number.base': 'Monthly amount must be a number',
      'number.min': 'Monthly amount cannot be negative',
      'any.required': 'Monthly amount is required'
    }),

  is_active: Joi.boolean().optional(),

  notes: Joi.string().max(1000).allow(null, '').optional()
    .messages({
      'string.max': 'Notes must be less than 1000 characters'
    })
});

export const updateIncomeSourceSchema = Joi.object({
  name: Joi.string().min(1).max(255)
    .messages({
      'string.empty': 'Name cannot be empty',
      'string.max': 'Name must be less than 255 characters'
    }),

  monthly_amount: Joi.number().min(0)
    .messages({
      'number.min': 'Monthly amount cannot be negative'
    }),

  is_active: Joi.boolean(),

  sort_order: Joi.number().integer().min(0),

  notes: Joi.string().max(1000).allow(null, '')
    .messages({
      'string.max': 'Notes must be less than 1000 characters'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});
