import { IReservation, IReservations } from "interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

let tempCarrito: Record<string, { user_id: number; starDatetime: string; products: { id: number }[] }> = {};

export const addProduct = (user_id: number, starDatetime: string, id: number, name: string) => {
    const nodeCart = tempCarrito[starDatetime];

    if (nodeCart) {
        const productExists = nodeCart.products.some((item) => item.id === id);
        if (!productExists) nodeCart.products.push({ id });
    }

    if (!nodeCart) {
        tempCarrito[starDatetime] = {
            user_id,
            starDatetime,
            products: [{
                id
            }]
        }
    }

    localStorage.setItem('cart', JSON.stringify(tempCarrito));
}

export const removeProduct = (starDatetime: string, productId: number) => {
    const entry = tempCarrito[starDatetime];
    if (entry) {
        entry.products = entry.products.filter((item) => item.id !== productId);

        if (entry.products.length === 0) {
            delete tempCarrito[starDatetime];
            localStorage.setItem('cart', JSON.stringify(tempCarrito));
        }
    }
}

export const getProducts = () => {
    return localStorage.getItem('cart')
}

export const sendReservations = ({ reservations }: IReservations) => {

    reservations.map(reservation => {
        reservation.endDateTime = reservation.starDatetime
        sendReservation(reservation);
    })

}

const sendReservation = async (data: IReservation): Promise<any> => {

    const response = await fetch(`${apiUrl}/booking`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    return await response.json();
}