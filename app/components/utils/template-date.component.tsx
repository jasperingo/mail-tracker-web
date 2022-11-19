export const TemplateDateComponent = ({ date }: { date: string; }) => {
  return  <div className="mb-4 text-gray-600">{ new Date(date).toUTCString() }</div>;
}
