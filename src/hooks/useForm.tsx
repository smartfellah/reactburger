//React
import { useState, SyntheticEvent } from "react";

export function useForm(initialState: { [key: string]: string }) {
  const [formState, setFormState] = useState<typeof initialState>(initialState);

  const handleFormChange = (event: SyntheticEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setFormState({ ...formState!, [name]: value });
  };

  return { formState, handleFormChange, setFormState };
}
