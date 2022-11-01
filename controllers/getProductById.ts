import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const getProductById = () => {
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const product = await prisma.product.findUnique({
				where: {
					id: Number(req.params.id),
				},
			});
			res.json(product);
		} catch (error) {
			next(error);
		}
	};
};
