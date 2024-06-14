'use client';

import React, {useContext, useState, useEffect} from 'react';
import { ProductContext, Product, Category } from "@/context/ProductContext";
import { request } from '@/services/request';


const ListProduct = ({}) => {
    const { Products, removeProduct, deleteProduct, addProduct } = useContext(ProductContext);
    const [productsList, setProducts] = useState<Product[]>([])

    const options = (Object.keys(Category)
                        .filter((item) => isNaN(Number(item)))
                    ).map((item, index) => ({
                        label: item,
                        value: index
                        }));

    const getProducts = async () => {
        let res = await request<Product[]>('http://127.0.0.1:5000/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, false)
        for (let index = 0; index < res.length; index++) {
            addProduct(res[index]._id, res[index].name, res[index].qtd, res[index].category, res[index].preco, res[index].description)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="text-center">
            <h2 className="mb-4 text-xl font-light">
                My Products
            </h2>
            <div className='flex gap-2 mb-4 font-light items-center'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTab(option.value)}
                        className={selectedTab === option.value ? 'active-tab' : ''}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <ul className="max-w-md space-y-1 text-center mb-4">
                {Products.map((Product:Product, index:number) => (
                    <li className={`flex flex-center gap-2 mb-2 ${Product.category !== selectedTab ? 'hidden':''}`} key={index}>
                            <p className='space-x-2 space-y-2'>Nome: {Product.name}</p>
                            <p className='space-x-2 space-y-2'>Preço: {Product.preco}</p>
                            <p className='space-x-2 space-y-2'>Descrição: {Product.description}</p>

                        
                        <button onClick={() => {
                            deleteProduct(Product._id)
                            removeProduct(index)}}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListProduct;