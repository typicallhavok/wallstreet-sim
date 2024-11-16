import { AuthProvider } from './Contexts/AuthContext';
import Navbar from './Components/Navbar';
import './globals.css';
import { League_Spartan } from 'next/font/google';

const spartan = League_Spartan({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
});

export const metadata = {
    title: 'StockWong',
    description: 'Stock tracking and analysis platform',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={spartan.className}>
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
} 