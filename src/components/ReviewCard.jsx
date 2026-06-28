export default function ReviewCard({ review }) {
  return (
    <article className="review-card card">
      <div className="review-stars">{'★'.repeat(review.rating)}</div>
      <h3>{review.title}</h3>
      <p>{review.body}</p>
      <strong>{review.author}</strong>
    </article>
  );
}
