import { Navbar } from '@/components/Navbar';
import Dashboard from '@/components/dashboard';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white">
      <Navbar />
      <Dashboard />
    </main>
  );
}
