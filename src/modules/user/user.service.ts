import { UserRole } from '@prisma/client';
import { prisma } from '../../app';

const createAdminIntoDb = async (payload: any) => {
  const userData = {
    email: payload.admin.email,
    password: payload.password,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const newAdmin = await transactionClient.admin.create({
      data: payload.admin,
    });
    return newAdmin;
  });
  return result;
};

export const userServices = {
  createAdminIntoDb,
};
