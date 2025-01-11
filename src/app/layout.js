
import NextAuthProvider from '@/providers/NextAuthProvider';
import '../style/globals.css'
import Navbar from '@/components/Navbar';
import ReactQueryProvider from '@/providers/reactQueryProvider';


export const metadata = {
  title: "Testimonial",
  description: "Testimonial site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <NextAuthProvider>
            <div className='body-overly'></div>
            <Navbar />
            {children}
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
