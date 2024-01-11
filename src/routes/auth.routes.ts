import express from "express";
import userApi from "@/api/auth.api";
import { authMiddleware, isAdmin } from "@/api/middlewares";

const router = express.Router();

/**
 * @openapi
 * /api/invite:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send invite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: email address of the user
 *     responses:
 *       201:
 *         description: User invited successfully
 *         content:
 *           application/json:
 *             example:
 *               message: user invited successfully
 *               invitationLink: http://localhost:5000/api/signup/nv38y2ysv8
 *       401:
 *         description: Not authorized to perform action
 *         content:
 *           application/json:
 *             example:
 *               error: not authorized to perform action
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: email is required
 */
router.post("/invite", authMiddleware, isAdmin, userApi.sendInvite);

/**
 * @openapi
 * /api/resend-invite:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Resend invite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: email address of the user
 *     responses:
 *       200:
 *         description: Invite resent successfully
 *         content:
 *           application/json:
 *             example:
 *               message: invite resent successfully
 *               invitationLink: http://localhost:5000/api/signup/nv38y2ysv8
 *       401:
 *         description: Not authorized to perform action
 *         content:
 *           application/json:
 *             example:
 *               error: not authorized to perform action
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: user not invited yet
 */
router.post("/resend-invite", authMiddleware, isAdmin, userApi.resendInvite);

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: email address of the user
 *               password:
 *                 type: string
 *                 description: user's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: "3d354429-8099-4d4e-9418-4f3ca11a6595"
 *                 email: "ilyas@gmail.com"
 *               token: "jwt token here"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 - "Email Address is a required field"
 *                 - "Password is a required field"
 */
router.post("/login", userApi.login);

/**
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User signup
 *     parameters:
 *       - in: query
 *         name: invite
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: email address of the user
 *               password:
 *                 type: string
 *                 description: user's password
 *     responses:
 *       201:
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             example:
 *               message: user signed up successfully
 *               user:
 *                 id: "3d354429-8099-4d4e-9418-4f3ca11a6595"
 *                 email: "ilyas@gmail.com"
 *               token: "jwt token here"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "this invitation token is expired"
 */
router.post("/signup", userApi.signup);

export = router;
