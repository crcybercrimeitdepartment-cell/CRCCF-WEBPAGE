import Insights from '../components/Insights';

export default function InsightsPage() {
  return (
    <div className="bg-white min-h-screen pt-4 pb-16 [&>section]:!pt-0">
      <Insights hideViewAll={true} />
    </div>
  );
}
