import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../Modal";

import styles from './styles.module.scss'

export function Notification() {
    const { notificationModal, setNotificationModal, notificationMessage } = useModal()
    return (
        <Modal
            onRequestClose={() => setNotificationModal(false)}
            open={notificationModal}
            title="Alert"
        >
            <div>
                <div>
                    {notificationMessage}
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={() => { setNotificationModal(false) }}>
                        Continue
                    </button>
                </div>
            </div>
        </Modal>
    )
}