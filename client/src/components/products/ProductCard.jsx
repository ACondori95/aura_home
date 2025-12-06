import {Link} from "react-router-dom";
import {BsCartPlus} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";

const ProductCard = ({product}) => {
  const {_id, name, price, imageUrl, stock} = product;

  return (
    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300'>
      {/* Imagen del Producto */}
      <Link
        to={`/productos/${_id}`}
        className='block relative h-48 overflow-hidden'>
        <img
          src={imageUrl}
          alt={name}
          className='w-full h-full object-cover transition duration-300 hover:scale-105'
        />
      </Link>

      <div className='p-4 flex flex-col justify-between h-auto'>
        {/* Nombre y Precio */}
        <div className='mb-2'>
          <h3 className='text-neutral-dark font-semibold text-base truncate'>
            {name}
          </h3>
          <p className='text-lg font-bold text-brand-blue'>
            ${price.toFixed(2)}
          </p>
        </div>

        {/* Botones de Acción */}
        <div className='flex justify-between items-center mt-2'>
          {/* Botón de Agregar al Carrito */}
          <button
            className={`flex items-center justify-center p-2 rounded-full text-white transition duration-200 ${
              stock > 0
                ? "bg-brand-green hover:bg-opacity-80"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={stock === 0}
            title={stock > 0 ? "Añadir al Carrito" : "Agotado"}>
            <BsCartPlus size={20} />
          </button>

          {/* Botón de Favorito */}
          <button className='text-gray-400 hover:text-brand-red p-2 rounded-full transition duration-200'>
            <AiOutlineHeart size={20} />
          </button>
        </div>

        {/* Etiqueta de Stock */}
        {stock === 0 && (
          <span className='absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded'>
            Agotado
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
