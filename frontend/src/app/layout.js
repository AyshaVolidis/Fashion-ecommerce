import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Fashion Shop - E-commerce',
  description: 'Modern headless e-commerce application'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              Designed & Developed by <a href="https://github.com/AyshaVolidis" target="_blank" rel="noopener noreferrer" className="font-semibold text-black hover:underline">Aysha Volidis</a>
            </p>
            <p className="mt-2 text-xs text-gray-400">
              © {new Date().getFullYear()} Fashion E-commerce. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
