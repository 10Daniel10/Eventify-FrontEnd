const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const addProduct = async (data: any): Promise<any> => {

    const response = await fetch(`${apiUrl}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: data,
    });
    return await response.json();
}