//React
import { useState, ChangeEvent } from "react";

export function useForm(initialState: { [key: string]: string }) {
  const [formState, setFormState] = useState<typeof initialState>(initialState);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setFormState({ ...formState!, [name]: value });
  };

  return { formState, handleFormChange, setFormState };
}
