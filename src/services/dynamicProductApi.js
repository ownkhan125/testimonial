


export const fetchSpecificProduct = async (name) => {
    try {
        const res = await fetch(`http://localhost:3000/api/product/${name}`);
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};