"use client";

import { AuthContext, SignIdData } from "@/context/AuthContext";
import { useForm } from 'react-hook-form';
import { useContext } from "react";


const Login = ({}) => {
    const {register, handleSubmit} = useForm<SignIdData>();
    const { login, authError } = useContext(AuthContext);

    const handleLogin = (data : SignIdData) => {
        login(data);
    }

    
    return (
        <main className="bg-gradient-to-r from-blue-400 md:to-purple-400">
            <div>
                <form className="flex flex-col items-center mt-10" onSubmit={handleSubmit(handleLogin)}>
                <h1 className="text-2xl sm:text-4xl tracking-wide text-center pt-8 pb-10 font-light ">
                    Login page
                </h1>
                    <label htmlFor="username">Usuário: </label>
                    <input 
                        {...register('username')}
                        type="text" 
                        name='username' 
                        id='username' 
                        placeholder="username" 
                    />
                    <label htmlFor="password">Senha: </label>
                    <input 
                        {...register('password')}
                        type="password" 
                        name='password' 
                        id='password' 
                        placeholder="password" 
                    />
                    <div className="space-y-3">
                        <button 
                            type="submit"
                            className="bg-gray-600 font-light text-white px-1 py-1 rounded-lg mt-4 hover:bg-blue-600 items-center"
                            value="Acessar"
                        >
                            Acessar
                        </button>
                    </div>
                </form>
                {authError && <p className="font-light items-center text-center mt-4">{authError}</p>}
            </div>
        </main>
    );
}

export default Login;