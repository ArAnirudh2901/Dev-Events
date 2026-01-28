'use server'

import { Booking } from "@/database"
import connectToDB from "../mongodb"
import posthog from "posthog-js"

export const createBooking = async ({ eventId, slug, email }) => {
    try {
        if (!eventId) {
            return {
                success: false,
                error: { message: 'Event ID is required', fields: { eventId: 'Event ID is required' } }
            }
        }

        if (!email) {
            return {
                success: false,
                error: { message: 'Email is required', fields: { email: 'Email is required' } }
            }
        }

        await connectToDB()
        const booking = await Booking.create({ eventId: String(eventId), slug, email })

        const bookingData = {
            _id: booking._id.toString(),
            eventId: booking.eventId.toString(),
            email: booking.email,
            createdAt: booking.createdAt?.toISOString(),
            updatedAt: booking.updatedAt?.toISOString(),
            __v: booking.__v,
        }

        return { success: true }
    } catch (e) {
        console.error('Create booking failed ', e)
        const fieldErrors = {}

        if (e?.name === 'ValidationError' && e?.errors) {
            Object.entries(e.errors).forEach(([path, error]) => {
                fieldErrors[path] = error?.message || 'Invalid value'
            })
        }
        posthog.captureException('Booking creation failed')
        return { success: false }
    }
}