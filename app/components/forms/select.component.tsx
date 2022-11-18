type Props = {
  id: string;
  label: string;
  name: string; 
  value?: any;
  error?: string;
  required?: boolean;
  defaultText?: string;
  options: { value: any; text: string }[]
}

export const SelectComponent = ({ id, label, name, options, error, required = true, value = '', defaultText = '' }: Props) => {
  return (
    <div className="mb-dimen-sm">
      <label htmlFor={id} className="font-bold">{ label } { !required && '(optional)' }</label>
      <select 
        id={id}
        name={name} 
        required={required}
        defaultValue={value}
        className="block w-full p-2 border border-orange-600 rounded-lg outline-none bg-white disabled:bg-gray-200" 
      >
        <option value="">{ defaultText }</option>
        {
          options.map(item => (
            <option key={item.value} value={item.value}>{ item.text }</option>
          ))
        }
      </select>
      <div className="text-color-error">{ error }</div>
    </div>
  );
}
