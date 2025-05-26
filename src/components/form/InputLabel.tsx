// import React from "react";
// import Label from "./Label";
// import Input from "./input/InputField";


// interface InputLabelProps {
//     label: string;
//     name: string;
//     type?: string;
//     required?: boolean;
//     placeholder?: string;
//     value: string;
//     error?: string;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const InputLabel: React.FC<InputLabelProps> = ({
//     label,
//     name,
//     type = "text",
//     required = false,
//     placeholder = "",
//     value,
//     error,
//     onChange,
// }) => {
//     return (
//         <div className="mb-4">
//             <Label htmlFor={name}>
//                 {label} {required && <span className="text-error-500">*</span>}
//             </Label>
//             <Input
//                 id={name}
//                 name={name}
//                 type={type}
//                 defaultValue={value}
//                 placeholder={placeholder}
//                 onChange={onChange}
//                 error={!!error}
//             />
//             {error && <p className="text-sm text-error-500 mt-1">{error}</p>}
//         </div>
//     );
// };

// export default InputLabel;
