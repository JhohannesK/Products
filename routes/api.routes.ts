import { PrismaClient } from '@prisma/client';
import { Request, NextFunction, Response } from 'express';
import { getAllProducts } from '../controllers/getAllProducts';

const prisma = new PrismaClient();

const router = require('express').Router();

router.get('/products', getAllProducts());

router.get(
	'/products/:id',
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
	}
);

router.post(
	'/products/',
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
	}
);

router.delete(
	'/products/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const product = await prisma.product.delete({
				where: {
					id: Number(id),
				},
			});
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	'/products/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		const product = await prisma.product.update({
			where: {
				id: Number(req.params.id),
			},
			data: req.body,
		});
		res.json(product);
	}
);
module.exports = router;
