import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

import { getFeaturedEvents, getEventById } from '../../helpers/api-util';

function EventDetailPage(props) {
    const { event } = props;
    if (!event) {
        return (
            <div className='center'>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}
export const getStaticProps = async (context) => {

    const id = context.params.id;
    const eventData = await getEventById(id);
    return {
        props: {
            event: eventData
        }
    }
}
export const getStaticPaths = async () => {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { id: event.id } }))
    return {
        paths,
        fallback: true
    }
}
export default EventDetailPage;
