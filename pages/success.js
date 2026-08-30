import React, { useEffect, useState } from 'react';

export default function Success() {
  const [orderId, setOrderId] = useState('ORD-PROCESSING');
  const [amount, setAmount] = useState('0.00');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    const amt = params.get('amount');
    if (id) setOrderId(id);
    if (amt) setAmount(amt);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textAlign: 'center',
        maxWidth: '450px',
        width: '100%'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '15px' }}>✅</div>
        <h1 style={{ color: '#10b981', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          Payment Successful!
        </h1>
        <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '25px' }}>
          Thank you for your purchase. Your order has been placed securely.
        </p>
        
        <div style={{ background: '#f3f4f6', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'left' }}>
          <p style={{ fontSize: '13px', color: '#4b5563', margin: '0 0 5px 0' }}>Order Reference:</p>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0', fontFamily: 'monospace' }}>{orderId}</p>
          
          <p style={{ fontSize: '13px', color: '#4b5563', margin: '15px 0 5px 0' }}>Total Paid:</p>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', margin: '0' }}>Rs. {amount}</p>
        </div>

        <a href="https://factoryoutletshoes.store" style={{
          display: 'block',
          width: '100%',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '12px 0',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '15px'
        }}>
          Return to Store
        </a>
      </div>
    </div>
  );
}
