const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const getHistorialReservations = async (id: number | null): Promise<any> => {
    if (id === null) return

    const response = await fetch(`${apiUrl}/booking/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: 'GET'
    });

    return await response.json();

} 