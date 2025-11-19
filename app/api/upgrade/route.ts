import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, plan, cadence } = body

    // Validate required fields
    if (!userId || !plan || !cadence) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, plan, and cadence are required' },
        { status: 400 }
      )
    }

    // Calculate expiration date based on cadence
    const expiresAt = new Date()
    if (cadence === 'Monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1)
    } else if (cadence === 'Yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    // Create or update subscription
    const subscription = await prisma.subscription.upsert({
      where: {
        userId: userId,
      },
      update: {
        plan,
        cadence,
        status: 'active',
        expiresAt,
        updatedAt: new Date(),
      },
      create: {
        userId,
        plan,
        cadence,
        status: 'active',
        expiresAt,
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: `Successfully upgraded to ${plan} plan (${cadence})`,
        subscription 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error upgrading subscription:', error)
    return NextResponse.json(
      { error: 'Failed to upgrade subscription', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

