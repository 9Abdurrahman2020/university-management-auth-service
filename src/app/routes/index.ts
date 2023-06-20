import express from 'express';
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.routes';
import { adminRouter } from '../modules/admin/admin.route';
import { departmentRouter } from '../modules/department/department.route';
import { facultyRouter } from '../modules/faculty/faculty.route';
import { semesterRoute } from '../modules/semester/semester.route';
import { studentRouter } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/semester',
    route: semesterRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/department',
    route: departmentRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/faculty',
    route: facultyRouter,
  },
  {
    path: '/admin',
    route: adminRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
