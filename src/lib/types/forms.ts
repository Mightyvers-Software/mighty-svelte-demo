export type FormErrors = Record<string, string[] | undefined>;

export interface FormActionData {
	message?: string;
	errors?: FormErrors;
}
