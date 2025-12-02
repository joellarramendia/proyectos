import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { Guitar, CartItem } from '../types'

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : Guitar) {
        // Busca si el item ya existe en el carrito comparando los IDs
        // Retorna el índice (0, 1, 2...) si lo encuentra, o -1 si no existe
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
        if (itemExists >= 0) { //existe en el carrito
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        } else {
            const newItem : CartItem = {
                ...item,
                quantity: 1
            }
            setCart([...cart, newItem])
        }
    }

    function removeFromCart(id : Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    // Función para incrementar la cantidad de un item específico en el carrito
    function increaseQuantity(id : Guitar['id']) {
        // Recorre todos los items del carrito usando map
        // map crea un nuevo array con los items modificados
        const updateCart = cart.map(item => {
            // Si el ID del item actual coincide con el ID buscado
            if (item.id === id && item.quantity < MAX_ITEMS) {
                // Retorna una copia del item con la cantidad incrementada en 1
                // Usa spread operator para mantener las demás propiedades del item
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            // Si no coincide el ID, retorna el item sin modificar
            return item
        })
        // Actualiza el estado del carrito con el nuevo array modificado
        setCart(updateCart)
    }

    function decreaseQuantity(id : Guitar['id']) {
        // Recorre todos los items del carrito usando map
        // map crea un nuevo array con los items modificados
        const updateCart = cart.map(item => {
            // Si el ID del item actual coincide con el ID buscado
            if (item.id === id && item.quantity > MIN_ITEMS) {
                // Retorna una copia del item con la cantidad incrementada en 1
                // Usa spread operator para mantener las demás propiedades del item
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            // Si no coincide el ID, retorna el item sin modificar
            return item
        })
        // Actualiza el estado del carrito con el nuevo array modificado
        setCart(updateCart)
    }

    function clearCart() {
        setCart([])
    }

    //STATE DERIVADO
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    const carTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        carTotal
    }
}

