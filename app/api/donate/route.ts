import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SUPPORTERS_FILE = path.join(process.cwd(), 'data', 'supporters.json')

interface Supporter {
  name: string
  amount: number
}

function readSupporters(): Supporter[] {
  if (!fs.existsSync(SUPPORTERS_FILE)) {
    return []
  }
  const data = fs.readFileSync(SUPPORTERS_FILE, 'utf-8')
  return JSON.parse(data)
}

function writeSupporters(supporters: Supporter[]) {
  const dirPath = path.dirname(SUPPORTERS_FILE)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(SUPPORTERS_FILE, JSON.stringify(supporters, null, 2))
}

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

async function createInvoice(token: string, name: string, amount: number) {
  const invoiceUrl = "https://restapi.paylink.sa/api/addInvoice"
  const invoiceData = {
    orderNumber: Date.now().toString(),
    amount: amount,
    callBackUrl: "https://your-nextjs-app-url.com/achievements/donation-success",
    cancelUrl: "https://your-nextjs-app-url.com/achievements",
    clientName: name,
    clientMobile: "NA",
    currency: "SAR",
    products: [
      {
        title: "Donation",
        price: amount,
        qty: 1,
        description: "Donation to support",
        isDigital: false
      }
    ],
    smsMessage: "Thank you for your donation of [AMOUNT]. [SHORT_URL]",
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
    const { name, amount } = await request.json()
    
    if (!name || !amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
    }

    const token = await getAuthToken()
    const invoiceResponse = await createInvoice(token, name, amount)

    if (invoiceResponse.success) {
      return NextResponse.json({ success: true, mobileUrl: invoiceResponse.mobileUrl })
    } else {
      return NextResponse.json({ success: false, error: invoiceResponse.paymentErrors }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing donation:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

