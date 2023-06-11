import express from 'express';
import { semesterRoute } from '../modules/semester/semester.route';
import { userRoute } from '../modules/user/user.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/semester',
    route: semesterRoute.router,
  },
  {
    path: '/user',
    route: userRoute.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
