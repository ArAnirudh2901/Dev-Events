'use server';

import { Event } from "@/database";
import connectToDB from "../mongodb";
import { revalidatePath } from "next/cache";

export const getSimilarEventsBySlug = async (slug) => {
    try {
        await connectToDB()

        const event = await Event.findOne({ slug }).lean()

        if (!event) return []

        const similarEvents = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags }
        }).limit(3).lean()

        return JSON.parse(JSON.stringify(similarEvents))

    } catch {
        return []
    }
}

export const createEvent = async (formData) => {
    try {
        await connectToDB()

        // Parse agenda and tags from comma-separated strings
        const agendaString = formData.get('agenda')
        const tagsString = formData.get('tags')

        const agenda = agendaString
            ? agendaString.split(',').map(item => item.trim()).filter(Boolean)
            : []

        const tags = tagsString
            ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
            : []

        const eventData = {
            title: formData.get('title'),
            description: formData.get('description'),
            overview: formData.get('overview'),
            image: formData.get('image'),
            venue: formData.get('venue'),
            location: formData.get('location'),
            date: formData.get('date'),
            time: formData.get('time'),
            mode: formData.get('mode'),
            audience: formData.get('audience'),
            organizer: formData.get('organizer'),
            agenda,
            tags,
        }

        const event = await Event.create(eventData)

        revalidatePath('/')
        revalidatePath('/events')

        return {
            success: true,
            slug: event.slug,
        }
    } catch (e) {
        console.error('Create event failed:', e)

        const fieldErrors = {}

        if (e?.name === 'ValidationError' && e?.errors) {
            Object.entries(e.errors).forEach(([path, error]) => {
                fieldErrors[path] = error?.message || 'Invalid value'
            })
        }

        return {
            success: false,
            error: {
                message: e?.message || 'Failed to create event',
                fields: fieldErrors,
            },
        }
    }
}