import { Suspense } from "react";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import { getAllEvents } from "@/lib/actions/event.actions";

export const metadata = {
    title: 'All Events | Dev Events',
    description: 'Browse all developer events - hackathons, meetups, and conferences',
};

async function AllEventsList() {
    const events = await getAllEvents();

    if (!events || events.length === 0) {
        return (
            <div className="empty-state">
                <p>No events found. Be the first to create one!</p>
                <Link href="/create" className="create-link">Create Event</Link>
            </div>
        );
    }

    return (
        <div className="events">
            {events.map((event) => (
                <EventCard key={event.slug} {...event} />
            ))}
        </div>
    );
}

export default function EventsPage() {
    return (
        <section id="events-page">
            <div className="header mb-5">
                <h1>All Events</h1>
            </div>

            <div className="events-container">
                <Suspense fallback={<div className="loading">Loading events...</div>}>
                    <AllEventsList />
                </Suspense>
            </div>
        </section>
    );
}
