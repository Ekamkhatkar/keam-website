import { NextRequest, NextResponse } from 'next/server';

const paypal = require('@paypal/checkout-server-sdk');

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, packageName } = await request.json();

    // Validate required fields
    if (!orderId || !amount || !packageName) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Create PayPal order
    const paypalRequest = new paypal.orders.OrdersCreateRequest();
    paypalRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount.toString(),
          },
          description: `KeamVisuals - ${packageName}`,
          custom_id: orderId,
        },
      ],
      application_context: {
        brand_name: 'KeamVisuals',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXTAUTH_URL}/payment/success?order_id=${orderId}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancel`,
      },
    });

    const response = await client.execute(paypalRequest);
    
    // Find the approval URL
    const approvalLink = response.result.links.find(
      (link: any) => link.rel === 'approve'
    );

    return NextResponse.json({ 
      id: response.result.id,
      approval_url: approvalLink.href // Send this to client
    });
    
  } catch (error) {
    console.error('PayPal error:', error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}