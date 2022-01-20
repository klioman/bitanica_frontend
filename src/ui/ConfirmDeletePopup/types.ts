export interface IConfirmDeletePopupProps {
	title?: string;
	bodyMessage?: string;
	openModal: boolean;
	closeModal: () => void;
	handleDelete: () => void;
}
