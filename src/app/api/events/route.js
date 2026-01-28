import { Event } from "@/database"
import connectToDB from "@/lib/mongodb"
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Cloudinary auto-configures from CLOUDINARY_URL env variable

// Helper function to parse array fields (handles JSON arrays, comma-separated strings, or single values)
function parseArrayField(value) {
    if (!value) return []

    // Try parsing as JSON first
    try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : [parsed]
    } catch {
        // If not valid JSON, treat as comma-separated string
        return value.split(',').map(item => item.trim()).filter(Boolean)
    }
}

export async function POST(req) {
    try {
        await connectToDB()

        // Get FormData from request
        const formData = await req.formData()

        // Extract file
        const file = formData.get('image')

        if (!file) {
            return NextResponse.json({ message: 'Image file is required' }, { status: 400 })
        }

        let tags = parseArrayField(formData.get('tags'))
        let agenda = parseArrayField(formData.get('agenda'))

        // Helper to generate slug from title
        const generateSlug = (title) => {
            return title
                ?.toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '') || `event-${Date.now()}`
        }

        // Extract event data from formData
        const title = formData.get('title')
        const event = {
            title,
            slug: formData.get('slug') || generateSlug(title),
            description: formData.get('description'),
            overview: formData.get('overview'),
            venue: formData.get('venue'),
            location: formData.get('location'),
            date: formData.get('date'),
            time: formData.get('time'),
            mode: formData.get('mode')?.replace(/^["']|["']$/g, '').trim(),
            audience: formData.get('audience'),
            organizer: formData.get('organizer'),
            // Parse agenda and tags - handle both JSON arrays and comma-separated strings
            agenda: parseArrayField(formData.get('agenda')),
            tags: parseArrayField(formData.get('tags')),
        }

        // Convert file to buffer for Cloudinary upload
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'DevEvent' },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            ).end(buffer)
        })

        // Add image URL to event
        event.image = uploadResult.secure_url

        // Create event in database
        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda,
        })

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            message: 'Event Creation Failed',
            error: error instanceof Error ? error.message : 'Unknown'
        }, { status: 500 })
    }
}

export async function GET() {

    try {
        await connectToDB()

        const events = await Event.find().sort({ createdAt: -1 })

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ message: 'Event fetching failed.', error: e }, { status: 500 })
    }
}