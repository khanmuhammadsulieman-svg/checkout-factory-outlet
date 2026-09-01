useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get('status') || params.get('success');
    const failedParam = params.get('failed');
  const currentOrderId = params.get('orderId') || params.get('basket_id') || 'ORD-NEW';
    setOrderId(currentOrderId);

    if (statusParam === 'completed' || statusParam === 'success' || statusParam === '1') {
      setPaymentStatus('success');
      setTimeout(() => {
        window.location.href = `https://factoryoutletshoes.store/checkout?payment=success&orderId=${currentOrderId}`;
      }, 3500);
    } else if (statusParam === 'failed' || statusParam === '0' || failedParam === 'true') {
      setPaymentStatus('failed');
      setTimeout(() => {
        window.location.href = `https://factoryoutletshoes.store/checkout?payment=failed&orderId=${currentOrderId}`;
      }, 4000);
    }
  }, []);
