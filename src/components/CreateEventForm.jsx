'use client';

import { createEvent } from '@/lib/actions/event.actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateEventForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setGeneralError('');

        const formData = new FormData(e.target);
        const result = await createEvent(formData);

        if (result.success) {
            router.push(`/events/${result.slug}`);
        } else {
            setErrors(result.error?.fields || {});
            setGeneralError(result.error?.message || 'Failed to create event');
            setIsSubmitting(false);
        }
    };

    return (
        <div id="create-event-form">
            {generalError && (
                <div className="error-banner">
                    {generalError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Basic Information</h3>

                    <div className="form-group">
                        <label htmlFor="title">Event Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter event title"
                            maxLength={100}
                            required
                        />
                        {errors.title && <span className="error">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Brief description of the event"
                            rows={3}
                            maxLength={1000}
                            required
                        />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="overview">Overview *</label>
                        <textarea
                            id="overview"
                            name="overview"
                            placeholder="Detailed overview of what attendees can expect"
                            rows={4}
                            maxLength={1000}
                            required
                        />
                        {errors.overview && <span className="error">{errors.overview}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL *</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        {errors.image && <span className="error">{errors.image}</span>}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Location & Time</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="venue">Venue *</label>
                            <input
                                type="text"
                                id="venue"
                                name="venue"
                                placeholder="e.g., Convention Center"
                                required
                            />
                            {errors.venue && <span className="error">{errors.venue}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location *</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="e.g., San Francisco, CA"
                                required
                            />
                            {errors.location && <span className="error">{errors.location}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Date *</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                            />
                            {errors.date && <span className="error">{errors.date}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">Time *</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                required
                            />
                            {errors.time && <span className="error">{errors.time}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mode">Event Mode *</label>
                        <select id="mode" name="mode" required>
                            <option value="">Select mode</option>
                            <option value="In-Person">In-Person</option>
                            <option value="Online">Online</option>
                            <option value="Hybrid (In-Person & Online)">Hybrid (In-Person & Online)</option>
                        </select>
                        {errors.mode && <span className="error">{errors.mode}</span>}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Additional Details</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="audience">Target Audience *</label>
                            <input
                                type="text"
                                id="audience"
                                name="audience"
                                placeholder="e.g., Developers, Designers"
                                required
                            />
                            {errors.audience && <span className="error">{errors.audience}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="organizer">Organizer *</label>
                            <input
                                type="text"
                                id="organizer"
                                name="organizer"
                                placeholder="e.g., Tech Community"
                                required
                            />
                            {errors.organizer && <span className="error">{errors.organizer}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="agenda">Agenda Items *</label>
                        <textarea
                            id="agenda"
                            name="agenda"
                            placeholder="Enter agenda items separated by commas (e.g., Opening Keynote, Workshop Session, Networking Break)"
                            rows={3}
                            required
                        />
                        <span className="hint">Separate each agenda item with a comma</span>
                        {errors.agenda && <span className="error">{errors.agenda}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags *</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="e.g., javascript, react, web development"
                            required
                        />
                        <span className="hint">Separate tags with commas</span>
                        {errors.tags && <span className="error">{errors.tags}</span>}
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Event...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEventForm;
