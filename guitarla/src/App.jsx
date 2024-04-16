import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";


function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart'); //Obtener carrito del local storage
    return localStorageCart ? JSON.parse(localStorageCart) : [];//Verificar si hay carrito en el local storage
  }

  //State
  const [data] = useState([db]); //Data de la base de datos
  const [cart, setCart] = useState(initialCart); //Carrito de compras

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));//Guardar carrito en el local storage
  }, [cart]);

  function addToCart(item) {//Función para agregar al carrito
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);// Verificar si la guitarra ya está en el carrito
    if (itemExists >=0) { //Si la guitarra ya está en el carrito
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;//Incrementar cantidad de guitarra
      setCart(updateCart);//Actualizar carrito
      console.log("La guitarra ya está en el carrito");
    }else{
      item.quantity = 1; //Agregar cantidad de guitarra
      setCart([...cart, item]);// Agregar guitarra al carrito
      console.log("Guitarra agregada al carrito");
    }
    
  }

  function removeFromCart(id) {//Función para eliminar del carrito
    setCart(prevCart => prevCart.filter((guitar) => guitar.id !== id));//Eliminar guitarra del carrito
    console.log("Guitarra eliminada del carrito");
  }

  function increaseQuantity(id) {//Función para incrementar cantidad de guitarra
    const updateCart = [...cart]; //Actualizar carrito
    const item = updateCart.find((guitar) => guitar.id === id);//Buscar guitarra
    item.quantity++;
    setCart(updateCart);
    console.log("Cantidad de guitarra incrementada");
  }

  function decreaseQuantity(id) {//Función para decrementar cantidad de guitarra
    const updateCart = [...cart];//Actualizar carrito
    const item = updateCart.find((guitar) => guitar.id === id);//Buscar guitarra
    item.quantity--;
    if (item.quantity === 0) {
      setCart(updateCart.filter((guitar) => guitar.id !== id));//Eliminar guitarra del carrito
      console.log("Guitarra eliminada del carrito");
    }else{
      setCart(updateCart);
      console.log("Cantidad de guitarra decrementada");
    }
  }

  function clearCart() {//Función para limpiar carrito
    setCart([]);//Limpiar carrito
    console.log("Carrito limpiado");
  }

 


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data[0].map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
              />
          ))}

        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
