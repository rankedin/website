import { NextResponse } from "next/server"

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email format
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // For now, simulate successful subscription until database is set up
    // In production, this would check and create newsletter subscribers
    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter",
        subscriber: {
          id: "mock-id",
          email: email,
          subscribedAt: new Date().toISOString()
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET endpoint to get subscriber count
export async function GET() {
  try {
    // For now, return a mock count until database is set up
    const count = 25000
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Newsletter subscriber count error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}