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

async function getTransactionDetails(token: string, transactionNo: string) {
  const url = `https://restapi.paylink.sa/api/getTransaction/${transactionNo}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get transaction details')
  }

  return response.json()
}

export async function POST(request: Request) {
  try {
    const { transactionNo } = await request.json()
    
    if (!transactionNo) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
    }

    const token = await getAuthToken()
    const transactionDetails = await getTransactionDetails(token, transactionNo)

    if (transactionDetails.success && transactionDetails.data.status === 'Paid') {
      let supporters = readSupporters()
      const { clientName, amount } = transactionDetails.data

      const existingIndex = supporters.findIndex(s => s.name === clientName)

      if (existingIndex !== -1) {
        supporters[existingIndex].amount += amount
      } else {
        supporters.push({ name: clientName, amount })
      }

      supporters.sort((a, b) => b.amount - a.amount)
      writeSupporters(supporters)

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Transaction not successful' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error updating supporters:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

