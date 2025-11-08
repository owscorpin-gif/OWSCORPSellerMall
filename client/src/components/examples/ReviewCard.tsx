import ReviewCard from '../ReviewCard';

export default function ReviewCardExample() {
  return (
    <div className="p-8 max-w-2xl">
      <ReviewCard
        id="1"
        userName="Sarah Johnson"
        rating={5}
        date="2 days ago"
        comment="Excellent template! Very easy to customize and the code quality is top-notch. Highly recommended for anyone looking for a professional dashboard solution."
      />
    </div>
  );
}
