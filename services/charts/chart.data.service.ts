const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const getDataForChart = async (id: string): Promise<any> => {
    const response = await fetch(`${apiUrl}/booking/provider/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })

    return await response.json();
}