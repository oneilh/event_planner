type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};
export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  return (
    <div className="bg-primary">
      <h1>Event Page</h1>
      <p>This is the event page {id}.</p>
    </div>
  );
}
