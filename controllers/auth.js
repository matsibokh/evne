const express = require("express");
const bodyParser = require("body-parser").urlencoded({ extended: true });
const rootPath = "../";
const {
    wrapPromiseResponse} = require(rootPath + 'helpers/utils');
const router = express.Router();
const Auth = require (rootPath + "services/Auth");

/**
 * @swagger
 * paths:
 *  /signup:
 *    post:
 *      summary: user singup
 *      description: creating a new user
 *      tags:
 *        - Users
 *      consumes:
 *        - application/x-www-form-urlencoded
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: userName
 *          in: formData
 *          description: user login
 *          required: true
 *          type: string
 *        - name: pwd
 *          in: formData
 *          description: user password
 *          required: true
 *          type: string
 *          format: password
 *      responses:
 *        200:
 *          description: user jwt
 *          schema:
 *            type: object
 *            properties:
 *              jwt:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InBtYXRzaWJva2giLCJpYXQiOjE1ODUwOTI3MzYsImV4cCI6MTU4NTA5NjMzNn0.7I86pzbTq8Rq6O-jSQZUN61j5YtnqrpMQVL8Ttx5ZmQ
 *        400:
 *          description: Bad request
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: User with login pmatsibokh already exists
 *        403:
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
 *        500:
 *          description: server error
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: server is closed
 */
router.post("/signup", bodyParser, wrapPromiseResponse(
  function(req){
      return Auth.singUp(req.body);
  }
));

/**
 * @swagger
 * paths:
 *  /signin:
 *    post:
 *      summary: user singin
 *      description: user authentication
 *      tags:
 *        - Users
 *      consumes:
 *        - application/x-www-form-urlencoded
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: userName
 *          in: formData
 *          description: user login
 *          required: true
 *          type: string
 *        - name: pwd
 *          in: formData
 *          description: user password
 *          required: true
 *          type: string
 *          format: password
 *      responses:
 *        200:
 *          description: user jwt
 *          schema:
 *            type: object
 *            properties:
 *              jwt:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InBtYXRzaWJva2giLCJpYXQiOjE1ODUwOTI3MzYsImV4cCI6MTU4NTA5NjMzNn0.7I86pzbTq8Rq6O-jSQZUN61j5YtnqrpMQVL8Ttx5ZmQ
 *        400:
 *          description: Bad request
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: User with login pmatsibokh already exists
 *        403:
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
 *        500:
 *          description: server error
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: server is closed
 */
router.post("/signin", bodyParser, wrapPromiseResponse(
    function(req) {
        return Auth.singIn(req.body)
    }
));

module.exports = router;