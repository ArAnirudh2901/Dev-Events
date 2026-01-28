import mongoose from "mongoose";
import { sanitizeSlug, normalizeDate, normalizeTime } from "@/lib/utils";

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: (true, 'Title is required'),
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters']
        },

        overview: {
            type: String,
            required: [true, 'Overview is required'],
            trim: true,
            maxlength: [1000, 'Overview cannot exceed 1000 characters']
        },

        image: {
            type: String,
            required: [true, 'Image URL is required'],
            trim: true,
        },

        venue: {
            type: String,
            required: [true, 'Venue is required'],
            trim: true,
        },

        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },

        date: {
            type: String,
            required: [true, 'Date is required'],
            trim: true,
        },

        time: {
            type: String,
            required: [true, 'Time is required'],
            trim: true,
        },

        mode: {
            type: String,
            required: [true, 'Mode is required'],
            enum: ['online', 'offline', 'hybrid', 'Online', 'Offline', 'Hybrid', 'Hybrid (In-Person & Online)', 'In-Person'],
        },

        audience: {
            type: String,
            required: [true, 'Audience is required'],
            trim: true,
        },

        agenda: {
            type: [String],
            required: [true, 'Agenda is required'],
            validate: {
                validator: v => v.length > 0,
                message: 'At least one agenda item is required',
            },
        },

        organizer: {
            type: String,
            required: [true, 'Organizer is required'],
            trim: true,
        },

        tags: {
            type: [String],
            required: [true, 'Tags are required'],
            validate: {
                validator: v => v.length > 0,
                message: 'At least one tag is required',
            },
        },
    },
    {
        timestamps: true,
    }
)

EventSchema.pre('save', async function () {
    if (this.isModified('title') || this.isNew) {
        this.slug = sanitizeSlug(this.title)
    }

    if (this.isModified('date') && this.date) {
        this.date = normalizeDate(this.date)
    }

    if (this.isModified('time') && this.time) {
        this.time = normalizeTime(this.time)
    }
})

EventSchema.index({ date: 1, mode: 1 });
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
export default Event;