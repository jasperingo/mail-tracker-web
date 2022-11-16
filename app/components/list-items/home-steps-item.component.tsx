export const HomeStepsItem = ({ text, step }: { text: string; step: number; }) => {
  return (
    <li>
      <div className="flex gap-x-2 items-start mb-4">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full">{ step }</div>
        <div>{ text }</div>
      </div>
    </li>
  );
}
