import { UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";
import bcrypt from 'bcryptjs';
import { uploadImage } from "../../shared/multer";
import fs from 'fs';

const createUser = async (payload: { name: string; email: string; password: string; profilePhoto?: string }) => {
    console.log({payload})
    if (payload.profilePhoto) {
        const cloudinaryReponse = await uploadImage(payload.profilePhoto);
        // Optionally delete the local file after upload
        fs.unlinkSync(payload?.profilePhoto);
        payload.profilePhoto = cloudinaryReponse?.secure_url;
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.$transaction(async(tx) => {
        const newUser = await tx.user.create({
            data: {
                email: payload.email,
                password: hashedPassword
            }
        });
        const newPatient = await tx.patient.create({
            data:{
                name: payload.name,
                email: payload.email,
                profilePhoto: payload.profilePhoto
            }
        });
        return newUser;
    });
    return result;
};

const getUsers = async (role:UserRole) => {
    const users = await prisma.user.findMany({
        where: {
            role:role?.toUpperCase() as UserRole
        },
        include:{[role]:true}
    });
    return users;
};

const UserService = {
    createUser,
    getUsers
}

export default UserService;
