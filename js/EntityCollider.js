export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check(subject) {
        this.entities.forEach(function(candidate) {
            if (subject === candidate) return;

            if (subject.bounds.overlaps(candidate.bounds)) {
                subject.collides(candidate);
            }
        });
    }
}