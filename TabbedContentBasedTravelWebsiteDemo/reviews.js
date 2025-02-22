class Reviews {
    constructor() {
        this.reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    }

    addReview(destinationId, review) {
        if (!this.reviews[destinationId]) {
            this.reviews[destinationId] = [];
        }
        this.reviews[destinationId].push(review);
        localStorage.setItem('reviews', JSON.stringify(this.reviews));
    }

    getReviews(destinationId) {
        return this.reviews[destinationId] || [];
    }
}

const reviews = new Reviews();
export default reviews;