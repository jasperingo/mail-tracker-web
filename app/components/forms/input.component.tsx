type Props = {
  id: string;
  label: string;
  name: string; 
  value?: any;
  type?: string;
  step?: string;
  min?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

export const InputComponent = ({
  id, 
  label, 
  name, 
  step, 
  error, 
  min, 
  placeholder, 
  value = '', 
  type = 'text', 
  required = true, 
  disabled = false 
}: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="font-bold">{ label } { !required && '(optional)' }</label>
      <input 
        id={id}
        min={min}
        type={type} 
        name={name} 
        step={step}
        disabled={disabled}
        required={required}
        defaultValue={value}
        placeholder={placeholder}
        className="block w-full p-2 border border-orange-600 rounded-lg outline-none bg-white disabled:bg-gray-200" 
      />
      <div className="text-red-500">{ error }</div>
    </div>
  );
}
