import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { authService } from './auth.service';

const handleLogin = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('ums_refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User successfully login',
    data: others,
  });
});
const handleRefreshToken = catchAsync(async (req, res) => {
  const { ums_refreshToken } = req.cookies;
  const result = await authService.refreshToken(ums_refreshToken);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully created new token',
    data: result,
  });
});

const changePassword = catchAsync(async(req,res)=>{
  const passwordData = req.body;
  const result = await authService.changePassword(req.user,passwordData)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
})

export const authHandler = {
  handleLogin,
  handleRefreshToken,
  changePassword
};
