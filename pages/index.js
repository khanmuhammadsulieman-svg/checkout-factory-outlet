import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get('orderId') || 'ORD-' + Math.floor(Math.random() * 100000));
    setAmount(params.get('amount') || '1999.00');
    setEmail(params.get('email') || 'customer@factoryoutletshoes.store');
    setName(params.get('name') || 'Valued Customer');
  }, []);

  const handlePayment = async (gatewayType) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/volzix-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), orderId, email, gateway: gatewayType })
      });

      const data = await response.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.error || 'Failed to initialize payment session.');
      }
    } catch (err) {
      setError(err.message || 'Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '36px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        maxWidth: '440px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px', textAlign: 'center' }}>
          Factory Outlet
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginBottom: '24px' }}>
          Choose your digital payment method
        </p>

        <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
            <span style={{ color: '#475569' }}>Order ID:</span>
            <span style={{ fontWeight: '600', color: '#0f172a', fontFamily: 'monospace' }}>{orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
            <span style={{ color: '#475569' }}>Amount Due:</span>
            <span style={{ color: '#2563eb' }}>Rs. {amount}</span>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid #fee2e2' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* JazzCash Option */}
          <button
            onClick={() => handlePayment('jazzcash')}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              background: '#ffffff',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#1e293b'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#dc2626', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>
                JC
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '15px' }}>JazzCash Wallet</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>Instant mobile prompt</p>
              </div>
            </div>
            <span style={{ color: '#94a3b8' }}>➔</span>
          </button>

          {/* EasyPaisa Option */}
          <button
            onClick={() => handlePayment('easypaisa')}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              background: '#ffffff',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#1e293b'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>
                EP
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '15px' }}>EasyPaisa Account</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>App notification confirmation</p>
              </div>
            </div>
            <span style={{ color: '#94a3b8' }}>➔</span>
          </button>

          {/* OneQR Option */}
          <button
            onClick={() => handlePayment('oneqr')}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              background: '#ffffff',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#1e293b'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>
                QR
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '15px' }}>OneQR Scan & Pay</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>Scan with any banking app</p>
              </div>
            </div>
            <span style={{ color: '#94a3b8' }}>➔</span>
          </button>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#2563eb', fontWeight: '500' }}>
            Generating secure payment session...
          </p>
        )}
      </div>
    </div>
  );
}
