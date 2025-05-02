export interface FormField {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    validators?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: string;
    };
}
