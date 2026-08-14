export interface FormError {
	message: string;
	errors?: Record<string, string[] | undefined>;
}
