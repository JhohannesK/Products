import { PrismaClient } from '@prisma/client';
import { Request, NextFunction, Response } from 'express';
import { addNewProduct } from '../controllers/addNewProduct';
import { getAllProducts } from '../controllers/getAllProducts';
import { getProductById } from '../controllers/getProductById';

const prisma = new PrismaClient();

const router = require('express').Router();

router.get('/products', getAllProducts());

router.get('/products/:id', getProductById());

router.post('/products/', addNewProduct());

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
