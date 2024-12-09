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

async function createInvoice(token: string, name: string, phone: string, productId: string, amount: number) {
  const invoiceUrl = "https://restapi.paylink.sa/api/addInvoice"
  const invoiceData = {
    orderNumber: Date.now().toString(),
    amount: amount,
    callBackUrl: "https://your-nextjs-app-url.com/purchase/success",
    cancelUrl: "https://your-nextjs-app-url.com/products/" + productId,
    clientName: name,
    clientMobile: phone,
    currency: "SAR",
    products: [
      {
        title: "Product Purchase",
        price: amount,
        qty: 1,
        description: "Purchase of product ID: " + productId,
        isDigital: true
      }
    ],
    smsMessage: "Thank you for your purchase of [AMOUNT]. [SHORT_URL]",
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
    const { name, phone, productId, amount } = await request.json()
    const token = await getAuthToken()
    const invoiceResponse = await createInvoice(token, name, phone, productId, amount)

    if (invoiceResponse.success) {
      return NextResponse.json({ success: true, mobileUrl: invoiceResponse.mobileUrl })
    } else {
      return NextResponse.json({ success: false, error: invoiceResponse.paymentErrors }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing purchase:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

