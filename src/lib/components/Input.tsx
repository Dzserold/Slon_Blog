import { typeInput } from "../types";

export default function Input(props: typeInput) {
  return (
    <div>
      <input
        name={props.name}
        className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
        type={props.type}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
}
