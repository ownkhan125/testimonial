export const uploadConvertImage = async (img) => {
    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: img }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('error');
            return alert('something wrong Image')
        }
    } catch (error) {
        console.log('uploadImage::', error?.message);
    }
};