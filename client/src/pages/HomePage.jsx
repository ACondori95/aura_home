import {useEffect, useState} from "react";
import ProductService from "../api/product.service";
import ProductCard from "../components/products/ProductCard";
import {FiFilter} from "react-icons/fi";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getProducts();
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("No se pudo cargar el catálogo de productos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Componente de Sidebar de Filtros
  const FilterSidebar = () => (
    <div className='w-full md:w-64 p-4 bg-white rounded-lg shadow-md sticky top-20 h-fit'>
      <h2 className='text-xl font-bold mb-4 text-brand-blue flex items-center'>
        Filtros <FiFilter className='ml-2' />
      </h2>

      {/* Filtros: Categorías */}
      <div className='mb-4 border-b pb-3'>
        <h3 className='font-semibold text-neutral-dark mb-2'>Categorías</h3>
        <label className='flex items-center text-sm text-gray-700'>
          <input
            type='checkbox'
            className='mr-2 rounded text-brand-green focus:ring-brand-green'
          />
          Sillas
        </label>
        <label className='flex items-center text-sm text-gray-700'>
          <input
            type='checkbox'
            className='mr-2 rounded text-brand-green focus:ring-brand-green'
          />
          Textiles
        </label>
      </div>

      {/* Filtros: Precio */}
      <div className='mb-4 border-b pb-3'>
        <h3 className='font-semibold text-neutral-dark mb-2'>Precio</h3>
        <input
          type='range'
          min='0'
          max='1000'
          className='w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700'
        />
        <div className='flex justify-between text-xs text-gray-500 mt-1'>
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    </div>
  );

  // Contenido principal de la página
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* 1. Hero Banner */}
      <div className='relative mb-12 rounded-xl overflow-hidden shadow-xl h-96 bg-gray-200'>
        <img
          src='https://placehold.co/600x400'
          alt='Diseño Excepcional para tu Hogar'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight'>
            Diseño Excepcional
            <br /> para tu Hogar
          </h1>
          <button className='bg-orange-500 text-white px-6 py-2 rounded-full w-fit hover:bg-orange-600 transition duration-300 font-semibold'>
            Explorar Colección
          </button>
        </div>
      </div>

      {/* 2. Layout de Filtros y Grid de Productos */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Sidebar de Filtros */}
        <FilterSidebar />

        {/* Grid de Productos */}
        <div className='flex-grow'>
          <h2 className='text-2xl font-bold mb-6 text-neutral-dark'>
            Productos ({products.length})
          </h2>

          {isLoading && (
            <div className='text-center text-brand-blue'>
              Cargando productos...
            </div>
          )}

          {error && (
            <div className='text-center text-red-500 p-4 border border-red-300 bg-red-50 rounded-lg'>
              {error}
            </div>
          )}

          {!isLoading && products.length > 0 && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && !error && (
            <div className='text-center text-gray-600 p-8 border rounded-lg'>
              No hay productos disponibles en este momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
