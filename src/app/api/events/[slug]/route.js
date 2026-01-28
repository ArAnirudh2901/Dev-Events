import { Event } from '@/database'
import connectToDB from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import { sanitizeSlug } from '@/lib/utils'

export async function GET(request, { params }) {
    try {
        await connectToDB()
    } catch (dbError) {
        console.error("Database connection error:", dbError)
        return NextResponse.json(
            { error: "Database connection failed" },
            { status: 503 }
        )
    }

    try {
        const { slug } = await params
        if (!slug) {
            return NextResponse.json({ error: "Slug missing" }, { status: 400 })
        }

        const sanitizedSlug = sanitizeSlug(slug)
        const event = await Event.findOne({ slug: sanitizedSlug }).lean()

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 })
        }

        return NextResponse.json(event)
    } catch (error) {
        console.error("Error fetching event:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}