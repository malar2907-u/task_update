export default function InputField({
  labelName,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  options,
  required = false,
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1">
        {labelName}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(name, e.target.value)}
          className={`px-3 py-3 rounded-md bg-gray-100 border
            focus:outline-none focus:border-blue-500 text-xs
            focus:shadow-[0_0_0_2px_rgba(25,118,210,0.25)]
            transition-all duration-200
            ${error ? "border-red-500" : "border-gray-300"}`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange?.(name, e.target.value)}
          className={`px-3 py-3 rounded-md bg-gray-100 border
            focus:outline-none focus:border-blue-500 text-xs
            focus:shadow-[0_0_0_2px_rgba(25,118,210,0.25)]
            transition-all duration-200
            ${error ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="">Select</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(name, e.target.value)}
          className={`px-3 py-3 rounded-md bg-gray-100 border
            focus:outline-none focus:border-blue-500 text-xs
            focus:shadow-[0_0_0_2px_rgba(25,118,210,0.25)]
            transition-all duration-200
            ${error ? "border-red-500" : "border-gray-300"}`}
        />
      )}

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
