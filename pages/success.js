import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
      <h1 style={{ color: '#10b981' }}>Payment Successful!</h1>
      <p style={{ color: '#555', fontSize: '16px', margin: '20px 0' }}>
        Thank you for your order. Your reference ID is:
      </p>
      <div style={{ background: '#f4f4f5', padding: '12px', fontSize: '18px', fontWeight: 'bold', borderRadius: '6px', marginBottom: '30px' }}>
        {orderId || 'ORD-VERIFIED'}
      </div>
      <a href="https://factoryoutletshoes.store" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '12px 24px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
        Return to Store
      </a>
    </div>
  );
}
