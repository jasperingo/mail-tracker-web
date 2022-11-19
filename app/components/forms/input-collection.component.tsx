import { IoAddCircle } from "react-icons/io5";

export const InputCollectionComponent = <T,>(
  { collection, title, error, buttonText, onAddButtonClick, onRender }: 
  { collection: T[]; title: string; error?: string; buttonText?: string; onRender(i: T): void; onAddButtonClick?(): void }
) => {
  return (
    <fieldset className="my-4">
      <legend className="w-full flex justify-between items-center mb-4">
        <span className="font-bold">{ title }</span>
        {
          buttonText && (
            <button 
              type="button"
              onClick={onAddButtonClick}
              className="flex gap-x-2 items-center px-2 rounded-lg text-white bg-orange-600 active:bg-orange-400"
            >
              <IoAddCircle className="text-xl" />
              <span>{ buttonText }</span>
            </button>
          )
        }
      </legend>

      {
        collection.map(onRender)
      }
      
      <div className="text-red-500">{ error }</div>
    </fieldset>
  );
}
