const express = require("express");
const rootPath = "../";
const router = express.Router();
const Currency = require (rootPath + "services/Currency");

/**
 * @swagger
 /currencies:
 *   x-swagger-router-controller: currencies
 *   get:
 *    summary: return all currencies
 *    description: return array of objects
 *    consumes:
 *      - application/jsons
 *    tags:
 *      - Currency
 *    parameters:
 *      - in: header
 *        name: auth_token
 *        schema:
 *          type: string
 *          required: true
 *    responses:
 *      200:
 *        description: array of objects
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              ccy:
 *                type: string
 *                example: USD
 *              base_ccy:
 *                type: string
 *                example: UAH
 *              buy:
 *                type: string
 *                example: 27.46666
 *              sale:
 *                type: string
 *                example: 27.89999
 *      403:
 *        description: Authentication failed
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              example: Invalid user authentication.
 *            error:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: JsonWebTokenError
 *                message:
 *                  type: string
 *                  example: jwt malformed
 *      500:
 *         description: server error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: server is closed
 */
router.get("/currencies", function (req, res) {
    Currency.getCurrency().then(result => {
        res.send(result);
    });
});

/**
 * @swagger
 /currency/{currency_code}:
 *   x-swagger-router-controller: currencies
 *   get:
 *    summary: return all currencies
 *    description: return array of objects
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Currency
 *    parameters:
 *        - in: path
 *          name: currency_code
 *          schema:
 *              type: string
 *        - in: header
 *          name: auth_token
 *          schema:
 *            type: string
 *            required: true
 *    responses:
 *       200:
 *          description: object with currencies
 *          schema:
 *              type: object
 *              properties:
 *                ccy:
 *                  type: string
 *                  example: USD
 *                base_ccy:
 *                  type: string
 *                  example: UAH
 *                buy:
 *                  type: string
 *                  example: 27.46666
 *                sale:
 *                  type: string
 *                  example: 27.89999
 *       403:
 *          description: Authentication failed
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Invalid user authentication.
 *              error:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: JsonWebTokenError
 *                  message:
 *                    type: string
 *                    example: jwt malformed
 *       500:
 *          description: server error
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: server is closed
 */
router.get("/currency/:currency_code", function (req,res) {
    const currencyCode = req.params.currency_code;
    Currency.getCurrency(currencyCode).then(result => {
        res.send(result);
    });
});

module.exports = router;