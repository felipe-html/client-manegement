import { Dispatch, ReactElement, SetStateAction } from "react";

import styles from './styles.module.scss'

interface ModalProps {
    children: ReactElement
    overlay?: boolean
    open: boolean
    title: string
    onRequestClose: () => void
}

export function Modal({ children, onRequestClose, open, title }: ModalProps) {
    return (
        <section className={`${styles.overlay} ${!open && styles.closeModal}`}>
            <section className={`${styles.modal} ${!open && styles.closeModal}`}>
                <h1>{title}</h1>
                <div className={styles.closeButton} onClick={onRequestClose}>X</div>
                <div className={styles.children}>
                    {children}
                </div>
            </section>
        </section>
    )
}