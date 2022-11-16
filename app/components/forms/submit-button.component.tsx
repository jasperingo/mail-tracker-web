export const SubmitButtonComponent = ({ text, topSpace = true }: { text: string, topSpace?: boolean }) => {
  return (
    <div className={`mb-4 ${topSpace ? 'mt-8' : ''}`}>
      <button 
        className="w-full h-12 font-bold block text-white bg-orange-600 rounded-lg hover:bg-orange-400 disabled:bg-gray-400"
      >
        { text }
      </button>
    </div>
  );
}
