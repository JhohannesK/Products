import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const addNewProduct = () => {
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, price, categoryId } = req.body;
			const product = await prisma.product.create({
				data: {
					name,
					price,
					categoryId,
				},
			});
			res.json(product);
		} catch (error) {
			next(error);
		}
	};
};
