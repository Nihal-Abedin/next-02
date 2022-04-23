export const getAllEvents = async () => {
    const res = await fetch("https://next-app-df4a6-default-rtdb.firebaseio.com/events.json");
    const data = await res.json();

    const events = [];

    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        })
    }
    return events;
}
export const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

// export const getAllPaths = async () => {
//     const res = await fetch("https://next-app-df4a6-default-rtdb.firebaseio.com/events.json");
//     const data = res.json();

//     const paths = [];

//     for (const key in data) {
//         paths.push({ params: key })
//     }
//     return paths;
// }


export const getEventById = async (id) => {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}