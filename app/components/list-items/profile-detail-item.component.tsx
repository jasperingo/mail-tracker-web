export const ProfileDetailItemComponent = ({ title, body }: { title: string; body: string; }) => {
  return (
    <div className="mb-4 flex gap-x-2 items-start">
      <dt className="font-bold">{ title }:</dt>
      <dd>{ body }</dd>
    </div>
  );
}
