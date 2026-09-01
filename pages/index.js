import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'failed' | null

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Check if gateway returned a status back to subdomain
    const statusParam = params.get('status') || params.get('success');
    const failedParam = params.get('failed');
    
    const currentOrderId = params.get('orderId') || 'ORD-' + Math.floor(Math.random() * 100000);
    setOrderId(currentOrderId);
    setAmount(params.get('amount') || '1999.00');
    setEmail(params.get('email') || 'customer@factoryoutletshoes.store');
    setName(params.get('name') || 'Valued Customer');

    if (statusParam === 'success' || statusParam === '1' || window.location.search.includes('success=true')) {
      setPaymentStatus('success');
      setTimeout(() => {
        window.location.href = `https://factoryoutletshoes.store/order-success?orderId=${currentOrderId}`;
      }, 4000);
    } else if (statusParam === 'failed' || statusParam === '0' || failedParam === 'true' || window.location.search.includes('failed=true')) {
      setPaymentStatus('failed');
      setTimeout(() => {
        window.location.href = `https://factoryoutletshoes.store/checkout?payment=failed&orderId=${currentOrderId}`;
      }, 5000);
    }
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
        width: '100%',
        textAlign: 'center'
      }}>
        
        {paymentStatus === 'success' ? (
          <div>
            <div style={{ width: '60px', height: '60px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px' }}>✓</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Payment Successful!</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Your transaction for order <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{orderId}</span> was completed successfully.</p>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Redirecting you back to the store...</p>
          </div>
        ) : paymentStatus === 'failed' ? (
          <div>
            <div style={{ width: '60px', height: '60px', background: '#fee2e2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px' }}>✕</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Payment Failed</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>We couldn't process your payment for order <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{orderId}</span>.</p>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Redirecting you back to checkout...</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              Factory Outlet
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Choose your digital payment method
            </p>

            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'left' }}>
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
              <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid #fee2e2', textAlign: 'left' }}>
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
          </>
        )}

      </div>
    </div>
  );
}
