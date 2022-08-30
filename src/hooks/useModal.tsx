import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
interface ModalProviderProps {
    children: any;
}
interface ModalContextData {
    notificationModal: boolean
    setNotificationModal: Dispatch<SetStateAction<boolean>>
    notificationMessage: string
    setNotificationMessage: Dispatch<SetStateAction<string>>
    editClientModal: boolean
    setEditClientModal: Dispatch<SetStateAction<boolean>>
    confirmationModal: boolean
    setConfirmationModal: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext(({} as ModalContextData));

function ModalProvider({ children }: ModalProviderProps) {
    const [notificationModal, setNotificationModal] = useState<boolean>(false)
    const [notificationMessage, setNotificationMessage] = useState<string>('')

    const [editClientModal, setEditClientModal] = useState<boolean>(false)

    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)

    return (
        <div>
            <ModalContext.Provider value={{
                notificationModal,
                setNotificationModal,
                notificationMessage,
                setNotificationMessage,
                editClientModal,
                setEditClientModal,
                confirmationModal,
                setConfirmationModal,
            }}>
                {children}
            </ModalContext.Provider>
        </div>
    )
}

function useModal() {

    const context = useContext(ModalContext)

    return (
        context
    )
}

export { ModalProvider, useModal }