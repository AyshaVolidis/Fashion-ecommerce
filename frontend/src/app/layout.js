import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Fashion Shop - E-commerce',
  description: 'Modern headless e-commerce application'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
