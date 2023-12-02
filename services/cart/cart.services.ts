import { IProduct, IReservation, IReservations, IService } from "interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const addProduct = (userId: number | null, startDateTime: string, service: IService): void => {
    if (userId === null) return;
    const localStorageData = localStorage.getItem('cart');
    const arrayEnLocalStorage = localStorageData ? JSON.parse(localStorageData) : [];
    const objetoFecha = arrayEnLocalStorage.find((objeto: any) => objeto[startDateTime]);
    const productoExistente = objetoFecha
        ? objetoFecha[startDateTime].products.some((producto: any) => producto.id === service.id)
        : false;

    const { id, name, address, price, category, user } = service;

    if (!productoExistente) {
        if (objetoFecha) {
            objetoFecha[startDateTime].products.push({ id, name, address, price, category, user });
        } else {
            const nuevoObjeto = {
                [startDateTime]: {
                    startDateTime: `${startDateTime}T00:00:00`,
                    endDateTime: `${startDateTime}T00:00:00`,
                    userId,
                    products: [{ id, name, address, price, category, user }],
                },
            };
            arrayEnLocalStorage.push(nuevoObjeto);
        }

        localStorage.setItem('cart', JSON.stringify(arrayEnLocalStorage));
    }

};

export const removeProduct = (startDateTime: string, productId: number): void => {
    const localStorageData = localStorage.getItem('cart');
    const arrayEnLocalStorage = localStorageData ? JSON.parse(localStorageData) : [];
    const objetoFecha = arrayEnLocalStorage.find((objeto: any) => objeto[startDateTime]);

    if (objetoFecha) {
        const productosActualizados = objetoFecha[startDateTime].products.filter(
            (producto: any) => producto.id !== productId
        );
        objetoFecha[startDateTime].products = productosActualizados;
        localStorage.setItem('cart', JSON.stringify(arrayEnLocalStorage));
    }
};

export const getReservations = (): { startDateTime: string; user_id: number; products: IProduct[] }[] => {
    const localStorageData = localStorage.getItem('cart');
    const arrayEnLocalStorage = localStorageData ? JSON.parse(localStorageData) : [];
    const arrayOrdenado = arrayEnLocalStorage.sort((a: any, b: any) => {
        const fechaA = Object.keys(a)[0];
        const fechaB = Object.keys(b)[0];
        return new Date(fechaA).getTime() - new Date(fechaB).getTime();
    });
    return arrayOrdenado.map((objeto: any) => {
        return Object.values(objeto)[0];
    });
};


export const sendReservations = async () => {
    const localStorageData = localStorage.getItem('cart');
    const arrayEnLocalStorage = localStorageData ? JSON.parse(localStorageData) : [];
    arrayEnLocalStorage.map(async (reservation: IReservation) => {
        await sendReservation(Object.values(reservation)[0]);
    })

    localStorage.removeItem('cart');
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
    let algo = await response.json();
}