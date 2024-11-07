
import NextAuthProvider from '@/providers/NextAuthProvider';
import '../style/globals.css'


export const metadata = {
  title: "Testimonial",
  description: "Testimonial site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
