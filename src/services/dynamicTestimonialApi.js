

export const fetchProductTestimonial = async (name) => {
    try {
        const res = await fetch(`/api/testimonials/${name}`);
        const response = await res.json();
        console.log('rrespose', response.testimonials);
        return response.testimonials;
    } catch (error) {
        console.log(error);
    }
};