const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';


export const fetchSpecificProduct = async (name) => {
    try {
        const res = await fetch(`/api/product/${name}`);
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};