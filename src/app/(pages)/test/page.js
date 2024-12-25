// src/app/product/[name].js

// Page component receives the props directly
const Page = ({ checkProduct }) => {
    return (
        <>
            <h1>Product Details: {checkProduct}</h1>
            <p>{checkProduct}</p>

            <h2>Testimonials</h2>
            {/* <ul>
        {checktestimonials.map((testimonial, index) => (
          <li key={index}>{testimonial}</li>
        ))}
      </ul> */}
        </>
    );
};

// `getServerSideProps` is not used in the `app` folder directly, 
// but you can use `fetch` directly in the server components

export async function generateMetadata({ context }) {
    //   const { name } = params;  // Getting dynamic params
    console.log('check ');
    try {
        // Fetch Product Data
        const productRes = await fetch(`http://localhost:3000/api/product`);
        const product = productRes.json();

        // Fetch Testimonials Data
        // const testimonialRes = await fetch(`/api/testimonials/${name}`);
        // const testimonials = await testimonialRes.json();

        return {
            props: {
                checkProduct: product,  // Passing product data
                // checktestimonials: testimonials,  // Passing testimonials data
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { notFound: true };  // Handle error by showing 404
    }
}

export default Page;
