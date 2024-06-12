"use client"
import { useRouter } from "next/navigation";

const Home = ({}) => {
  const router = useRouter()
  return (
    <main className="h-screen bg-gradient-to-r from-blue-400 md:to-purple-400 ">
        <h1 className="text-2xl sm:text-4xl tracking-wide text-center pt-6 pb-10 sm:pb-12 justify-center font-light">
          Home page
        </h1>

          <div className="flex flex-col justify-center items-center  ">
            <p className="text-2xl tracking-wide text-center font-extralight justify-center rounded-lg border-y-2 border-x-2 max-w-96 p-5">
              Esse é um aplicativo que visa apresentar produtos e categorias de um mercado online. Logo abaixo você pode fazer o login para conseguir ver os produtos.
            </p>
          </div>


            <div className="py-8 px-10 flex flex-col items-center font-light">
              <button 
              type= "submit"
              onClick={() => router.push('/login')}
              className="bg-gray-600 text-white px-10 py-3 rounded-2xl mt-10 hover:bg-blue-600">
                Logar
              </button>
            </div>
    </main>
  );
};

export default Home;