'use client';

import { createBooking } from '@/lib/actions/booking.actions';
import { events } from '@/lib/constants';
import posthog from 'posthog-js';
import React, { useState } from 'react'

const BookEvent = ({ eventId, slug }) => {

    const [email, setEmail] = useState('')
    const [submitted, setSubmission] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { success, error } = await createBooking({ eventId, slug, email })

        if (success) {
            setSubmission(true)
            posthog.capture('event_booked', { eventId, slug, email })
        }

        else {
            const message = error?.message || 'Booking creation failed'
            console.error("Booking creation failed ", message, error?.fields)
            posthog.capture('booking_failed', {
                eventId,
                slug,
                email,
                message,
                fields: error?.fields || {}
            })
        }
    }

    return (
        <div id='book-event'>
            {submitted ? (
                <p className='text-sm'>Thank you for signing up!</p>
            ) : (
                <form action="submit" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id='email'
                            placeholder='Enter your email address' />
                    </div>

                    <button type='submit' className='button-submit'>Submit</button>
                </form>
            )}
        </div>
    )
}

export default BookEvent