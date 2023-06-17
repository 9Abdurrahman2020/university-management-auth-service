import express from 'express';
import { departmentRouter } from '../modules/department/department.route';
import { facultyRouter } from '../modules/faculty/faculty.routes';
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
  {
    path: '/faculty',
    route: facultyRouter.router,
  },
  {
    path: '/department',
    route: departmentRouter.router
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
