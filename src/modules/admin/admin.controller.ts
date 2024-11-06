import { Request, Response } from 'express';
import { adminServices } from './admin.service';
import pick from '../../app/shared/pick';
import { adminFilterableField } from './admin.const';

const getAllAdmin = async (req: Request, res: Response) => {
  const filterData = pick(req.query, adminFilterableField);
  const result = await adminServices.getAllAdminFromDb(filterData);
  res.send(result);
};

export const adminControllers = {
  getAllAdmin,
};
