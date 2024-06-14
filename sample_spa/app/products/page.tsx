import AddProduct from "@/components/AddProduct";
import ListProduct from "@/components/ListProduct";
import { ProductContextProvider } from "@/context/ProductContext";



const Products = async ({}) => {
  return (
    <main className="h-screen bg-gradient-to-r from-blue-400 md:to-purple-400">
      <h1 className="text-2xl sm:text-4xl font-light tracking-wide text-center pt-8 pb-10">
        Products list
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