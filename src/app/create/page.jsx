import CreateEventForm from '@/components/CreateEventForm';

export const metadata = {
    title: 'Create Event | Dev Events',
    description: 'Create a new developer event',
};

const CreateEventPage = () => {
    return (
        <section id="create-event">
            <div className="header">
                <h1>Create Event</h1>
                <p className="subheading">
                    Share your event with the developer community
                </p>
            </div>

            <CreateEventForm />
        </section>
    );
};

export default CreateEventPage;
