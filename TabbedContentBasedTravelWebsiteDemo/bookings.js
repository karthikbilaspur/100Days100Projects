class Bookings {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    }

    bookDestination(destinationId, userId) {
        if (!this.bookings[destinationId]) {
            this.bookings[destinationId] = [];
        }
        this.bookings[destinationId].push(userId);
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }

    getBookings(destinationId) {
        return this.bookings[destinationId] || [];
    }
}

const bookings = new Bookings();
export default bookings;