import mongoose from "mongoose";
import Event from "./event.model.js";

const BookingSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event ID is required']
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            validate: {
                validator: function (email) {
                    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                    return emailRegex.test(email)
                },
                message: 'Please provide me a validate email address',
            },
        },
    },
    {
        timestamps: true
    }
)

BookingSchema.pre('validate', async function () {
    if (!this.isModified('eventId') && !this.isNew) return

    try {
        const eventExists = await Event.exists({ _id: this.eventId })

        if (!eventExists) {
            this.invalidate('eventId', `Event with ID ${this.eventId} does not exist`)
        }
    }
    catch (err) {
        this.invalidate('eventId', 'Invalid event ID format or database error')
    }
})

BookingSchema.index({ eventId: 1 })
BookingSchema.index({ eventId: 1, createdAt: -1 })
BookingSchema.index({ email: 1 })

BookingSchema.index(
    { eventId: 1, email: 1 },
    { unique: true, name: 'uniq_event_email' }
)

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
export default Booking;