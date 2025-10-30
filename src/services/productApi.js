const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export const fetchProduct = async () => {
    try {
        const response = await fetch(`/api/product`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};


export const sendProduct = async (data) => {
    try {
        const res = await fetch(`/api/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        })

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};



const deleteItem = async (id) => {
    try {
        setLoading(true);
        const res = await fetch('/api/product', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            setCheck(id)
        } else {
            console.error('Failed to delete the item');
        }
    } catch (error) {
        console.log(error?.message);
    } finally {
        document.body.classList.toggle('modal-open');
        setIsModalOpen(null);
        setLoading(false);
    }
};