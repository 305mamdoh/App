import { NextResponse } from 'next/server'

async function getAuthToken() {
  const authUrl = "https://restapi.paylink.sa/api/auth"
  const authData = {
    apiId: "APP_ID_1701162901475",
    secretKey: "53d0413f-3606-38e9-94f6-20fe45d542a3",
    persistToken: "false"
  }

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  })

  if (!response.ok) {
    throw new Error('Failed to obtain authentication token')
  }

  const data = await response.json()
  return data.id_token
}

async function createInvoice(token: string, name: string, phone: string, amount: number) {
  const invoiceUrl = "https://restapi.paylink.sa/api/addInvoice"
  const invoiceData = {
    orderNumber: Date.now().toString(),
    amount: amount,
    callBackUrl: "https://your-nextjs-app-url.com/payment-success",
    cancelUrl: "https://your-nextjs-app-url.com/search",
    clientName: name,
    clientMobile: phone,
    currency: "SAR",
    products: [
      {
        title: "General Payment",
        price: amount,
        qty: 1,
        description: "General payment to D07 store",
        isDigital: true
      }
    ],
    smsMessage: "Thank you for your payment of [AMOUNT]. [SHORT_URL]",
    supportedCardBrands: ["mada", "visaMastercard", "amex"],
    displayPending: true
  }

  const response = await fetch(invoiceUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  })

  if (!response.ok) {
    throw new Error('Failed to create invoice')
  }

  return response.json()
}

export async function POST(request: Request) {
  try {
    const { name, phone, amount } = await request.json()
    
    if (!name || !phone || !amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
    }

    const token = await getAuthToken()
    const invoiceResponse = await createInvoice(token, name, phone, amount)

    if (invoiceResponse.success) {
      return NextResponse.json({ success: true, mobileUrl: invoiceResponse.mobileUrl })
    } else {
      return NextResponse.json({ success: false, error: invoiceResponse.paymentErrors }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

