const { isNumber, isString, isInvalidFieldType } = require("../helpers/helperFunctions");

module.exports = class ValidatorAPI {
    static validate (req, res) {

        const sendErrorMessage = (rule, data) => {
            res.status(400).json({
                message: `field ${rule.field} failed validation.`,
                status: "error",
                data: {
                    error: true,
                    field: rule.field,
                    field_value: data[rule.field],
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            })
        }

        const sendSuccessMessage = (rule, data) => {
            res.status(200).json({
                message: `field ${rule.field} successfully validated.`,
                status: "success",
                data: {
                    error: false,
                    field: rule.field,
                    field_value: data[rule.field],
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            })
        }

        const notExpectedTypeErrorMessage = (rule) => {
            res.status(400).json({
                message: `value of field ${rule.field} in data is not of expected type.`,
                status: "error",
                data: null
            })
        }

        if (req.body.rule === undefined) {
            return res.status(400).json({
                message: "rule field is required.",
                status: "error",
                data: null
            })
        }
        if (req.body.data === undefined) {
            return res.status(400).json({
                message: "data field is required.",
                status: "error",
                data: null
            })
        }

        const data = req.body.data;
        const rule = req.body.rule;
        const requiredFieldNotInData = Object.keys(data).includes(rule.field)
        const isInvalidDataField = isInvalidFieldType(data);
        const isInvalidRuleField = isInvalidFieldType(rule);

        if (isInvalidDataField) {
            return res.status(400).json({
                message: "data field should be either a string, an array or object.",
                status: "error",
                data: null
            })
        }

        if (isInvalidRuleField) {
            return res.status(400).json({
                message: "rule field should be either a string, an array or object.",
                status: "error",
                data: null
            })
        }

        if (!requiredFieldNotInData) {
            return res.status(400).json({
                message: `field ${rule.field} is missing from data.`,
                status: "error",
                data: null
            })
        }

        if (rule.condition === "gt") {
            if (typeof(rule.condition_value) !== typeof(data[rule.field])) {
                return notExpectedTypeErrorMessage(rule);
            }
            if (data[rule.field] > rule.condition_value) {
                return sendSuccessMessage(rule, data);
            } else {
                return sendErrorMessage(rule, data);
            }
        }

        if (rule.condition === "gte") {
            if (typeof(rule.condition_value) !== typeof(data[rule.field])) {
                return notExpectedTypeErrorMessage(rule);
            }
            if (data[rule.field] >= rule.condition_value) {
                return sendSuccessMessage(rule, data);
            } else {
                return sendErrorMessage(rule, data);
            }
        }

        if (rule.condition === "eq") {
            if (typeof(rule.condition_value) !== typeof(data[rule.field])) {
                return notExpectedTypeErrorMessage(rule);
            }
            if (data[rule.field] === rule.condition_value) {
                return sendSuccessMessage(rule, data);
            } else {
                return sendErrorMessage(rule, data);
            }
        }

        if (rule.condition === "neq") {
            if (typeof(rule.condition_value) !== typeof(data[rule.field])) {
                return notExpectedTypeErrorMessage(rule);
            }
            if (data[rule.field] !== rule.condition_value) {
                return sendSuccessMessage(rule, data);
            } else {
                return sendErrorMessage(rule, data);
            }
        }

        if (rule.condition === "contains") {
            const conditionValue = rule.condition_value;
            const dataFieldValue = data[rule.field];
            const conditionValueIsString = isString(conditionValue);
            const conditionValueIsNumber = isNumber(conditionValue);

            if (conditionValueIsNumber) {
                return sendErrorMessage(rule, data);
            }
            
            if (conditionValueIsString) {
                if (conditionValue.includes(dataFieldValue)) {
                    return sendSuccessMessage(rule, data);
                } else {
                    return sendErrorMessage(rule, data);
                }
            }else {
                const conditionValueItems = Object.values(conditionValue);
                if (conditionValueItems.includes(dataFieldValue)) {
                    return sendSuccessMessage(rule, data);
                } else {
                    return sendErrorMessage(rule, data);
                }
            }
        }
    }
}