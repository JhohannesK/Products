import { PrismaClient } from '@prisma/client';
import { Request, NextFunction, Response } from 'express';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const products = await prisma.product.findMany({
				include: {
					category: {
						select: {
							name: true,
						},
					},
				},
			});
			res.json(products);
		} catch (error) {
			next(error);
		}
	};
};
