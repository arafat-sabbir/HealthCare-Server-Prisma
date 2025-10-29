import { UserRole } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import UserService from "./user.service";
import { uploadImage } from "../../shared/multer";
import fs from 'fs';

const createUser = catchAsync(async (req, res) => {
 
    // Logic to create a user
    const result = await UserService.createUser(req.body);
    sendResponse(res, {
        statusCode: 201,
        message: "User created successfully",
        data: result
    });
});

const getUsers = catchAsync(async (req, res) => {
    // Logic to get users from the database
    const result = await UserService.getUsers(req?.query?.role as UserRole);
    sendResponse(res, {
        statusCode: 200,
        message: "Users retrieved successfully",
        data: result
    });
});

 const UserController = {
    createUser,
    getUsers
};

export default UserController;