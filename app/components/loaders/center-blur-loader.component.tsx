import { useTransition } from "@remix-run/react";

export const CenterBlurLoaderComponent = () => {
  const transition = useTransition();

  if (transition.state === 'idle') return null;

  return (
    <div 
      className="bg-gray-blur fixed top-0 left-0 z-20 w-screen h-screen flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg w-fit">
        <div className="animate-spin rounded-full border-4 border-t-gray-500 border-orange-600 w-8 h-8"></div>
      </div>
    </div>
  );
}
