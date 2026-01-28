import { Suspense } from 'react'
import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import BookEvent from '@/components/BookEvent'
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions'
import EventCard from '@/components/EventCard'
import { cacheLife } from 'next/cache'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({ icon, alt, label }) => {
    return (<div className='flex-row-gap-2 items-center'>
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{alt}: {label}</p>
    </div>)
}

const EventAgenda = ({ agendaItems }) => {
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {agendaItems?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const EventTags = ({ tags }) => {
    return (
        <div className='flex flex-row gap-1.5 flex-wrap'>
            {tags?.map((tag, index) => (
                <div className="pill" key={index}>{tag}</div>
            ))}
        </div>
    )
}

// Async content wrapped by Suspense to avoid blocking route rendering
async function EventContent({ paramsPromise }) {

    'use cache'
    cacheLife('hours')

    const { slug } = await paramsPromise

    const request = await fetch(`${BASE_URL}/api/events/${slug}`)
    const event = await request.json()

    if (!event || event.error) {
        return notFound()
    }

    const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer } = event
    const bookings = 10
    const similarEvents = await getSimilarEventsBySlug(slug)

    return (
        <>
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className="details">
                <div className="content">
                    <Image src={image} alt='Event Banner' width={800} height={800} className='banner' />
                    <section className="flex-col-gap">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon='/icons/calendar.svg' alt='Date' label={date} />
                        <EventDetailItem icon='/icons/clock.svg' alt='Time' label={time} />
                        <EventDetailItem icon='/icons/pin.svg' alt='Location' label={location} />
                        <EventDetailItem icon='/icons/mode.svg' alt='Mode' label={mode} />
                        <EventDetailItem icon='/icons/audience.svg' alt='Audience' label={audience} />
                    </section>

                    <EventAgenda agendaItems={agenda} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />

                </div>

                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot.
                            </p>
                        ) : <p className='text-sm'>Be the first to book your spot!</p>}

                        <BookEvent eventId={event._id} slug={event.slug} />
                    </div>
                </aside>
            </div>

            <div className="w-full mt-10">
                <h2 className="mb-6">Similar Events</h2>
                <div className="flex flex-wrap gap-10">
                    {similarEvents.length > 0 && similarEvents.map((event) => (
                        <div key={event._id} className="w-[300px]">
                            <EventCard {...event} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

// Lightweight skeleton while content streams
function EventSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="header">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="details mt-8">
                <div className="h-64 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}

// Main page component renders instantly; data resolves within Suspense
const EventDetailsPage = ({ params }) => {
    return (
        <section id="event">
            <Suspense fallback={<EventSkeleton />}>
                <EventContent paramsPromise={params} />
            </Suspense>
        </section>
    )
}

export default EventDetailsPage