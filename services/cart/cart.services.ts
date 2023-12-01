let tempCarrito: Record<string, { user_id: number; starDatetime: string; product: { id: number }[] }> = {};

export const addProduct = (user_id: number, starDatetime: string, id: number) => {
    const nodeCart = tempCarrito[starDatetime];

    if (nodeCart) {
        const productExists = nodeCart.product.some((item) => item.id === id);
        if (!productExists) nodeCart.product.push({ id });
    }

    if (!nodeCart) {
        tempCarrito[starDatetime] = {
            user_id,
            starDatetime,
            product: [{
                id
            }]
        }
    }

    localStorage.setItem('cart', JSON.stringify(tempCarrito));
}

export const removeProduct = (starDatetime: string, productId: number) => {
    const entry = tempCarrito[starDatetime];
    if (entry) {
        entry.product = entry.product.filter((item) => item.id !== productId);

        if (entry.product.length === 0) {
            delete tempCarrito[starDatetime];
            localStorage.setItem('cart', JSON.stringify(tempCarrito));
        }
    }
}

export const getProducts = () => {
    return localStorage.getItem('cart')
}