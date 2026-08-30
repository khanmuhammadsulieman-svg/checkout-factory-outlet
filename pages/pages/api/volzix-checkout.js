export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { amount, orderId } = req.body;

  try {
    const volzixResponse = await fetch('https://api.volzix.com/v1/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VOLZIX_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'PKR',
        order_reference: orderId,
        success_url: 'https://factoryoutletshoes.store/success',
        cancel_url: 'https://factoryoutletshoes.store/cart'
      }),
    });
    const paymentData = await volzixResponse.json();
    res.status(200).json({ redirectUrl: paymentData.payment_url });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
}
