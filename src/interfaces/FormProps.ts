export default interface FormProps {
    setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder: string;
}
