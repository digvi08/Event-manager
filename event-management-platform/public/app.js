document.getElementById('eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:5000/api/events';  // Backend URL

    const eventData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });

        if (response.ok) {
            alert('Event created successfully!');

            // Store the event in localStorage for timing check
            localStorage.setItem('upcomingEvent', JSON.stringify(eventData));

            window.location.reload();
        } else {
            alert('Failed to create event');
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

// Function to check event timing for notification 10 minutes before
function checkEventTiming() {
    const storedEvent = JSON.parse(localStorage.getItem('upcomingEvent'));
    if (!storedEvent) return; // No event stored, exit

    const eventDateTime = new Date(`${storedEvent.date}T${storedEvent.time}`);
    const currentDateTime = new Date();

    // Calculate time difference in minutes
    const timeDiff = (eventDateTime - currentDateTime) / 1000 / 60;

    // Notify user 10 minutes before the event
    if (timeDiff <= 10 && timeDiff > 0) {
        showEventNotification(storedEvent);
    }
}

// Function to show event notification
function showEventNotification(eventData) {
    const notificationMessage = `The event "${eventData.title}" is starting in less than 10 minutes!`;

    if (Notification.permission === 'granted') {
        new Notification('Event Reminder', {
            body: notificationMessage,
            icon: '/path/to/icon.png'  // Optional icon for notification
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Event Reminder', {
                    body: notificationMessage,
                    icon: '/path/to/icon.png'
                });
            }
        });
    }
}

// Check event timing every minute to ensure notification triggers
setInterval(checkEventTiming, 60000); // 1-minute interval

// Request notification permission when the page loads
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}
