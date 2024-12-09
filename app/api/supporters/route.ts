import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SUPPORTERS_FILE = path.join(process.cwd(), 'data', 'supporters.json')

interface Supporter {
  name: string
  amount: number
}

function readSupporters(): Supporter[] {
  return [
    { name: "أحمد", amount: 5000 },
    { name: "فاطمة", amount: 3750 },
    { name: "محمد", amount: 2800 },
    { name: "نورة", amount: 4200 },
    { name: "عبدالله", amount: 1500 },
    { name: "سارة", amount: 6100 },
    { name: "خالد", amount: 3000 }
  ];
}

export async function GET() {
  try {
    const supporters = readSupporters()
    return NextResponse.json(supporters)
  } catch (error) {
    console.error('Error fetching supporters:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

