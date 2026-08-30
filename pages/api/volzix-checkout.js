import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, orderId, email, gateway } = req.body;
  const merchantMid = process.env.VOLZIX_MID;
  const secretKey = process.env.VOLZIX_SECRET_KEY;

  if (!merchantMid || !secretKey) {
    return res.status(500).json({ error: 'Volzix credentials not configured' });
  }

  const formattedAmount = Number(amount || 100).toFixed(2);
  const webId = orderId || 'ORD-' + Math.floor(Math.random() * 1000000);
  const timestamp = Math.floor(Date.now() / 1000);
  const payerEmail = email || 'customer@factoryoutletshoes.store';

  // Point callbacks back to your main website domains with status parameters
  const returnUrl = `https://www.factoryoutletshoes.store/order-complete?orderId=${webId}&status=completed`;
  const cancelUrl = `https://www.factoryoutletshoes.store/cart?orderId=${webId}&status=failed`;

  const signString = `${merchantMid}|${formattedAmount}|PKR|${webId}|${payerEmail}|${timestamp}`;
  const signature = crypto.createHmac('sha256', secretKey).update(signString).digest('hex');

  try {
    const response = await fetch('https://volzix.com/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_mid: merchantMid,
        amount: Number(formattedAmount),
        currency: 'PKR',
        payer_email: payerEmail,
        web_id: webId,
        return: returnUrl,
        timestamp: timestamp,
        signature: signature,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(500).json({ error: data.error || 'Gateway initialization failed' });
    }

    let paymentUrl = data.payment_url || `https://volzix.com/pay/${data.flow_id}`;

    // If specific wallet gateway was requested, you can append/route accordingly
    return res.status(200).json({ redirectUrl: paymentUrl });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
