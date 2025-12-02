export type Guitar ={
    id: number
    name: string
    image: string
    description: string
    price: number
}

//HEREDA DE GUITAR
export type CartItem = Guitar & {
    quantity: number
}


//OTRAS MANERAS DE DEFINIR EL TIPO CARTITEM
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'image' | 'price'> & {
//     quantity: number
// }

// export type CartItem = Omit<Guitar,'id' | 'name' | 'price'> & {
//     quantity: number
// }

