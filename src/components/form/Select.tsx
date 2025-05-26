// import React from "react";
// import Label from "./Label";

// interface SelectOption {
//   label: string;
//   value: string | number;
// }

// interface SelectLabelProps {
//   label: string;
//   name: string;
//   required?: boolean;
//   value: string | number;
//   placeholder?: string;
//   error?: string;
//   options: SelectOption[];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const SelectLabel: React.FC<SelectLabelProps> = ({
//   label,
//   name,
//   required = false,
//   value,
//   placeholder = "Pilih...",
//   error,
//   options,
//   onChange,
// }) => {
//   return (
//     <div className="mb-4">
//       <Label htmlFor={name}>
//         {label} {required && <span className="text-error-500">*</span>}
//       </Label>
//       <select
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none ${error ? "border-error-500" : "border-gray-300"
//           }`}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       {error && <p className="text-sm text-error-500 mt-1">{error}</p>}
//     </div>
//   );
// };

// export default SelectLabel;
