'use client';

import { ProductContext} from '@/context/ProductContext';
import React, { useContext, useState, useEffect} from 'react';
import { ServerResponse, request } from '@/services/request';



const AddProduct = ({ }) => {

    const { Products, addProduct, removeProduct } = useContext(ProductContext)
    const [_id, setId] = useState();
    const [name, setName] = useState('');
    const [qtd, setQtd] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState('');
    const [preco, setPreco] = useState();
    const [addError, setError] = useState('')

    const saveProduct = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        addProduct(_id, name, qtd, category, preco, description);
        setId(_id);
        let res = await request('http://127.0.0.1:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJDYXJvbGluZSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzE4MTEzMzk0fQ.J8uH7BVAXE9YSGEWB5GMo7QWLE78MVyYjjIJEVUbhHQ',
                'isAdmin': 'true'
            },
            body: JSON.stringify({ _id, name, qtd, category, preco, description }),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, false)
        if (res.statusCode == '412' || res.statusCode == '500') {
            removeProduct(_id)
            setError('Erro. O seu produto não foi adicionado porque ele já existe ou algo grave aconteceu no servidor. Código: ' + res.statusCode)
        }
    }

    return (
        <div className="text-center">
            <h3 className="mb-4 text-xl font-light">Add Product</h3>
            <form onSubmit={saveProduct}>
                <div className="space-x-2 space-y-2 font-light">
                    <input
                        type="string"
                        placeholder="Nome"
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Id"
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="id"
                        value={_id}
                        onChange={(e) => setId(parseInt(e.target.value))}
                    />
                    <div className='flex col-span-2 items-center font-light space-x-3'>
                        <input
                            type="number"
                            placeholder="Quantidade"
                            className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                            name="quantidade"
                            value={qtd}
                            onChange={(e) => setQtd(parseInt(e.target.value))}
                        />
                        
                        <input
                            type="number"
                            placeholder="Valor"
                            className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                            name="preco"
                            value={preco}
                            onChange={(e) => setPreco(parseInt(e.target.value))}
                        />
                        
                        <input
                            type="number"
                            placeholder="Categoria"
                            className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="space-y-3 space-x-3">
                    <button
                        type="submit"
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg mx-2 hover:bg-blue-600 mt-5"
                    >
                        Incluir
                    </button>
                </div>
            </form>
            {addError && <p className='mt-6 font-light'>{addError}</p>}
        </div>
    );
};

export default AddProduct;