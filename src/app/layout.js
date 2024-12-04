
import NextAuthProvider from '@/providers/NextAuthProvider';
import '../style/globals.css'
import Navbar from '@/components/Navbar';


export const metadata = {
  title: "Testimonial",
  description: "Testimonial site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className='body-overly'></div>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
