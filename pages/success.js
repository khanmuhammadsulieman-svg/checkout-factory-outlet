import { useEffect, useState } from 'react';

export default function Success() {
  const [orderId, setOrderId] = useState('Loading...');
  const [amount, setAmount] = useState('0.00');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get('orderId') || 'ORD-' + Math.floor(Math.random() * 100000));
    setAmount(params.get('amount') || 'Verified');
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
      <h1 style={{ color: '#10b981' }}>Payment Successful!</h1>
      <p style={{ color: '#555', fontSize: '16px', margin: '20px 0' }}>
        Thank you for shopping with us. Your order reference ID is:
      </p>
      <div style={{ background: '#f4f4f5', padding: '12px', fontSize: '18px', fontWeight: 'bold', borderRadius: '6px', marginBottom: '15px' }}>
        {orderId}
      </div>
      <p style={{ color: '#777', fontSize: '14px', marginBottom: '30px' }}>
        Amount Paid: <b>Rs. {amount}</b>
      </p>
      <a href="https://factoryoutletshoes.store" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '12px 24px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
        Return to Store
      </a>
    </div>
  );
}
