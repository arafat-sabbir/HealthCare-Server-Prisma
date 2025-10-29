import { UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";

 const createUser = async (payload: { name: string; email: string; password: string }) => {
    const result = await prisma.$transaction(async(tx) => {
        const newUser = await tx.user.create({
            data: {
                email: payload.email,
                password: payload.password
            }
        });
        const newPatient = await tx.patient.create({
            data:{
                name: payload.name,
                email: payload.email,
            }
        });
        return newPatient;
    });
    return result;
};

const getUsers = async (role:UserRole) => {
    const users = await prisma.patient.findMany({
        where: {
            // Add any filtering criteria here
        }
    });
    return users;
};

const UserService = {
    createUser,
    getUsers
}

export default UserService;
