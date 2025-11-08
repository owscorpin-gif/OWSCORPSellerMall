import NewsletterSection from '../NewsletterSection';

export default function NewsletterSectionExample() {
  return (
    <NewsletterSection 
      onSubscribe={(email) => console.log('Subscribe:', email)}
    />
  );
}
