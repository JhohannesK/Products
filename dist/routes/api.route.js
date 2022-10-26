"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = require('express').Router();
router.get('/products', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/products/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.product.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/products/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, categoryId } = req.body;
        const product = yield prisma.product.create({
            data: {
                name,
                price,
                categoryId,
            },
        });
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/products/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield prisma.product.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/products/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.update({
        where: {
            id: Number(req.params.id),
        },
        data: req.body,
    });
    res.json(product);
}));
module.exports = router;
