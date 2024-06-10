"use client";

import React, {createContext, useState} from 'react';

export enum Category{
    Uncategorized,
    Salgados,
    Doces,
    Bebidas,
    Drinks
}

export type Product = {
    _id: string,
    name: string,
    qtd: number,
    category: Category,
    preco: number,
    description: string
}

type ProductContextType = {
    Products: Product[];
    addProduct: (_id:string, name:string, qtd:number, category:Category, preco:number, description:string) => void;
    removeProduct: (_id:string) => void;
    changeCategory: (_id:string, new_Category:Category) => void;
}

export const ProductContext = createContext({} as ProductContextType);

export const ProductContextProvider = ({ children } : {children: React.ReactNode;}) => {
    const [Products, setProducts] = useState<Product[]>([]);

    const addProduct = (_id:string, name:string, qtd:number, category:Category, preco:number, description:string) => {
        let newProduct = {
            _id: _id,
            name: name,
            qtd: qtd,
            category: category,
            preco: preco,
            description: description
        }
        setProducts([...Products, newProduct]);
    };

    const removeProduct = (_id:string) => {
        setProducts(Products.filter((_:Product, index: number) => parseInt(_id) !== index));
    };

    const changeCategory = (_id:string, new_Category:Category) => {
        Products[parseInt(_id)].category = new_Category;
    };

    return (
        <ProductContext.Provider value={{ Products, addProduct, removeProduct, changeCategory }}>
            {children}
        </ProductContext.Provider>
    );
}