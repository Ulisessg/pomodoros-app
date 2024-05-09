"use client";
import { Button, theme } from "d-system";
import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

const initialState: State = {
	closeModal: () => {},
	openModal: () => {},
	isOpen: false,
};

export const ModalCtx = createContext(initialState);

export const ModalProvider: FC<Props> = ({ children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const closeModal = () => {
		document.body.style.overflow = "scroll";
		setIsOpen(false);
	};

	const openModal = () => {
		document.body.style.overflow = "hidden";
		const buttonCloseModal = document.querySelector(
			"button[data-button-close-modal]"
		) as HTMLButtonElement;
		buttonCloseModal.focus();
		setIsOpen(true);
	};

	useEffect(() => {
		const handleEsc = (ev: KeyboardEvent) => {
			if (ev.key === "Escape") {
				closeModal();
			}
		};
		if (isOpen) {
			addEventListener("keydown", handleEsc);
		} else {
			removeEventListener("keydown", handleEsc);
		}
		return () => removeEventListener("keydown", handleEsc);
	}, [isOpen]);

	return (
		<ModalCtx.Provider
			value={{
				isOpen,
				closeModal,
				openModal,
			}}
		>
			{children}
		</ModalCtx.Provider>
	);
};

export const Modal: FC<ModalProps> = ({ children, ariaText }) => {
	const { isOpen, closeModal } = useContext(ModalCtx);

	return ReactDOM.createPortal(
		<ModalStyles open={isOpen} aria-label={ariaText} role="modal">
			<ButtonCloseContainer>
				<ButtonClose
					colorMessage="cancel"
					size="small"
					text="X"
					aria-label="Cerrar"
					type="button"
					onClick={closeModal}
					data-button-close-modal
				/>
			</ButtonCloseContainer>
			<ChildrenContainer>{children}</ChildrenContainer>
		</ModalStyles>,
		document.body
	);
};

const modalHeight = "100%";
const modalWidth = "100%";

const ModalStyles = styled.dialog`
	height: ${modalHeight};
	width: ${modalWidth};
	position: fixed;
	top: 0;
	right: 0;
`;

const ButtonCloseContainer = styled.div`
	display: grid;
	width: 100%;
	justify-content: end;
	height: ${theme.spacing * 8}px;
`;

const ButtonClose = styled(Button)`
	width: ${theme.spacing * 10}px;
	margin-right: ${theme.spacing}px;
`;

const ChildrenContainer = styled.div`
	height: ${modalHeight};
	padding: ${theme.spacing * 3}px;
	display: grid;
	justify-content: center;
`;

interface Props {
	children: ReactNode;
}

interface ModalProps extends Props {
	ariaText: string;
}

interface State {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}
