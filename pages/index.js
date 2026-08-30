import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Checkout() {
  const router = useRouter();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setCartData(router.query);
    }
  }, [router.isReady, router.query]);

  const handleVolzixPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/volzix-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });
      const { redirectUrl } = await response.json();
      if (redirectUrl) window.location.href = redirectUrl;
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Factory Outlet Secure Checkout</h2>
      <div style={{ padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
        <p><strong>Order ID:</strong> {cartData?.orderId || 'Loading...'}</p>
        <p><strong>Amount Due:</strong> Rs. {cartData?.amount || '0.00'}</p>
      </div>
      <button onClick={handleVolzixPayment} disabled={loading} style={{ width: '100%', padding: '15px', background: '#000', color: '#fff', cursor: 'pointer' }}>
        {loading ? 'Connecting...' : 'Pay with Card'}
      </button>
    </div>
  );
}
