export const service = async (endpoint, method, body) => {
    const resp = await fetch(`http://localhost:3000/${endpoint}`, {
        method,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    return resp.json();
}