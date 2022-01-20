/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export interface IUserKycOndatoPopupProps {
	openModal: boolean;
	closeModal: () => void;
	setIosLink: Dispatch<SetStateAction<{ url: string; params: any }>>;
}
