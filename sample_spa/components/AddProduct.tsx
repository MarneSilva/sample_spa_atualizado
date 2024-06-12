'use client';

import { Category, ProductContext } from '@/context/ProductContext';
import React, {useContext, useState} from 'react';
import { request } from '@/services/request';

type ServerResponse = {
    "statusCode": string
}

const AddProduct = ({}) => {

    const { Products, addProduct } = useContext(ProductContext);
    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [qtd, setQtd] = useState(0);
    const [category, setCategory] = useState(0);
    const [description, setDescription] = useState('');
    const [preco, setPreco] = useState(0);
    let newCategory


    const saveProduct = async (e: {preventDefault: () => void}) => {
        e.preventDefault();
        switch (category) {
            case 0:
                  newCategory = "Uncategorized"             
                break;
            case 1:
                  newCategory = "Salgados"
                break;
            case 2:
                  newCategory = "Doces"
                break;
            case 3:
                  newCategory = "Bebidas"
                break;
            case 4:
                  newCategory = "Drinks"
                break;
            default:
                  newCategory = "Uncategorized"
                break;
        }
        addProduct(_id, name, qtd, category, preco, description);
        setId(_id);
        let {statusCode: code}= await request<ServerResponse>('http://127.0.0.1:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJDYXJvbGluZSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzE4MTEzMzk0fQ.J8uH7BVAXE9YSGEWB5GMo7QWLE78MVyYjjIJEVUbhHQ',
                'isAdmin': 'true'
            },
            body: JSON.stringify({_id, name, qtd, category, preco, description}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        })
        if(!code || code == '500' || code == '412') {
            console.log('Ocorreu um erro ao adicionar seu produto ao database. Código: ' + code)
        } else {
            console.log('O produto foi adicionado com sucesso. Lista de produtos: ' + Products + ' Código da requisição: ' + code)
        }
    }

    return (
        <div className="text-center">
            <h3 className="mb-4 text-xl font-light text-gray-600">Adicionar Tarefa</h3>
            <form onSubmit={saveProduct}>
                <div className="space-x-2 space-y-2">
                    <input 
                        type="string" 
                        placeholder="Forneça o nome do produto" 
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Descreva o produto" 
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input 
                        type="string" 
                        placeholder="Forneça o id do produto" 
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="id"
                        value={_id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input 
                        placeholder="Forneça a quantidade do produto" 
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="quantidade"
                        value={qtd}
                        onChange={(e) => setQtd(parseInt(e.target.value))}
                    />
                    <input 
                        type="number" 
                        placeholder="Forneça o valor do produto" 
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="preco"
                        value={preco}
                        onChange={(e) => setPreco(parseInt(e.target.value))}
                    />
                    <input 
                        type="category" 
                        placeholder="Forneça a categoria do produto" 
                        className="border border-graya-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-3">
                    <button 
                        type="submit"
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg mx-2 hover:bg-blue-600 mt-5"
                    >
                        Incluir
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;