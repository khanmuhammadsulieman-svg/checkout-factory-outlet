const volzixResponse = await fetch('https://api.volzix.com/v1/checkout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.VOLZIX_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    merchant_id: process.env.VOLZIX_MID,
    amount: amount,
    currency: 'PKR',
    order_reference: orderId,
    success_url: `https://checkout.factoryoutletshoes.store/success?orderId=${orderId}&amount=${amount}`,
    cancel_url: 'https://factoryoutletshoes.store/cart'
  }),
});
