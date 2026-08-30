import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, orderId, email } = req.body;
  const merchantMid = process.env.VOLZIX_MID;
  const secretKey = process.env.VOLZIX_SECRET_KEY;

  if (!merchantMid || !secretKey) {
    return res.status(500).json({ error: 'Volzix credentials not configured on server' });
  }

  // Format amount to exactly 2 decimal places as required by Volzix specs
  const formattedAmount = Number(amount || 100).toFixed(2);
  const webId = orderId || 'ORD-' + Math.floor(Math.random() * 1000000);
  const timestamp = Math.floor(Date.now() / 1000);
  const payerEmail = email || 'customer@factoryoutletshoes.store';
  const returnUrl = 'https://factoryoutletshoes.store/success';

  // Build sign string for Step 1: /auth/
  // Formula: merchant_mid|amount|currency|web_id|payer_email|timestamp
  const signString = `${merchantMid}|${formattedAmount}|PKR|${webId}|${payerEmail}|${timestamp}`;
  const signature = crypto.createHmac('sha256', secretKey).update(signString).digest('hex');

  try {
    // Note the trailing slash required by Volzix endpoints
    const response = await fetch('https://volzix.com/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      console.error('Volzix API Error:', data);
      return res.status(500).json({ error: data.error || 'Failed to initialize Volzix payment intent' });
    }

    // Return the hosted checkout payment_url or flow_id based payment page
    const paymentUrl = data.payment_url || `https://volzix.com/pay/${data.flow_id}`;
    return res.status(200).json({ redirectUrl: paymentUrl });

  } catch (err) {
    console.error('Volzix Connection Error:', err);
    return res.status(500).json({ error: err.message || 'Internal connection error' });
  }
}
