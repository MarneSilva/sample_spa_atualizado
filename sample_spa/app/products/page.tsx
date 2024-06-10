import AddProduct from "@/components/AddProduct";
import ListProduct from "@/components/ListProduct";
import { ProductContextProvider } from "@/context/ProductContext";

const Products = async ({}) => {
  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Gestor de Tarefas
      </h1>

      <div className="grid place-items-center">
        <ProductContextProvider>
          <ListProduct />
          <AddProduct />
        </ProductContextProvider>
      </div>
    </main>
  );
};

export default Products;