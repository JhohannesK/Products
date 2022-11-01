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
const addNewProduct_1 = require("../controllers/addNewProduct");
const getAllProducts_1 = require("../controllers/getAllProducts");
const getProductById_1 = require("../controllers/getProductById");
const prisma = new client_1.PrismaClient();
const router = require('express').Router();
router.get('/products', (0, getAllProducts_1.getAllProducts)());
router.get('/products/:id', (0, getProductById_1.getProductById)());
router.post('/products/', (0, addNewProduct_1.addNewProduct)());
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
