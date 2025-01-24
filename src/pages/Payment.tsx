import React from 'react';
import { Header } from '@/components/home/Header';
import { Footer } from '@/components/home/Footer';

const Payment = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <iframe
          src="https://pay.hotmart.com/G97646259Y?bid=1737402944600"
          className="w-full h-[calc(100vh-200px)]"
          frameBorder="0"
          title="Hotmart Payment"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Payment;