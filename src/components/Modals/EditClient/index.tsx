import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useClient } from "../../../hooks/useClient"
import { useModal } from "../../../hooks/useModal"
import util from "../../../util"
import { CustomForm } from "../../CustomForm"
import { AddressProps, ClientProps } from "../../Form"
import { InputError } from "../../InputError"
import { Modal } from "../../Modal"

import styles from './styles.module.scss'

export function EditClient() {
    const { editClientModal, setEditClientModal, setNotificationMessage, setNotificationModal } = useModal()
    const { currentClient, setCurrentClient, handleDeleteClient, handleUpdateClient } = useClient()
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [confirmationMessage, setConfirmationMessage] = useState<string>('')

    useEffect(() => {
        setModalType('update')
    }, [editClientModal])

    async function handleUpdateUser() {
        if (
            currentClient.firstName === undefined ||
            currentClient.lastName === undefined ||
            currentClient.firstName === '' ||
            currentClient.lastName === ''
        ) {
            setErrorMessage('Please, tell us the client name.')
            setError(true)
            return
        }

        if (currentClient.nickName === undefined || currentClient.nickName === '') {
            setErrorMessage('Please, tell us the client nickname.')
            setError(true)
            return
        }

        if (currentClient.countryCode === undefined || currentClient.countryCode === '') {
            setErrorMessage('Please, tell us the client country code.')
            setError(true)
            return
        }

        if (currentClient.zipCode === undefined || currentClient.zipCode === '') {
            setErrorMessage('Please, tell us the client zip code.')
            setError(true)
            return
        }

        let address = {} as AddressProps

        let response = await axios.get(`https://viacep.com.br/ws/${currentClient.zipCode}/json/`)
            .then((response) => {
                if (response.data.erro) {
                    return 'error'
                }

                address = response.data as AddressProps
                return 'success'
            })
            .catch((error: AxiosError) => {
                return 'error'
            })

        if (response === 'error') {
            setErrorMessage('Please, insert a valid zip code.')
            setError(true)
            return
        }

        setError(false)
        setErrorMessage('')

        const newclient = {
            ...currentClient,
            block: address.logradouro,
            city: address.localidade,
            neighborhood: address.bairro,
            state: address.uf
        } as ClientProps

        handleUpdateClient(newclient)
        setEditClientModal(false)
        setModalType('confirmation')
        setNotificationMessage('Client updated successfully.')
        setNotificationModal(true)
    }

    async function getAddress() {
        await axios.get(`https://viacep.com.br/ws/${currentClient.zipCode}/json/`)
            .then((response) => {

                const data = response.data as AddressProps

                setCurrentClient({
                    ...currentClient,
                    block: data.logradouro,
                    city: data.localidade,
                    neighborhood: data.bairro,
                    state: data.uf
                })

                setError(false)

            })
            .catch((error: AxiosError) => {
                setError(true)
                setErrorMessage('Zipcode invalid')
            })
    }

    function handleDeleteUser() {
        setModalType('confirmation')
        setConfirmationMessage('Do you want to delete this client?')
    }

    function handleConfirmDeleteClient() {
        handleDeleteClient(currentClient)
        setEditClientModal(false)
        setNotificationMessage('Client deleted successfully.')
        setNotificationModal(true)
    }

    const [modalType, setModalType] = useState('update')

    return (
        <Modal
            open={editClientModal}
            title={'Client Details'}
            onRequestClose={() => {
                setEditClientModal(false)
                setModalType('update')
            }}
        >
            {
                modalType === 'update' ?
                    <div className={styles.modalContent}>
                        <CustomForm
                            placeholder="First name"
                            value={currentClient.firstName}
                            onChange={(e) => setCurrentClient({ ...currentClient, firstName: util.nameMask(e.currentTarget.value) })}
                        />
                        <CustomForm
                            placeholder="Last name"
                            value={currentClient.lastName}
                            onChange={(e) => setCurrentClient({ ...currentClient, lastName: util.nameMask(e.currentTarget.value) })}
                        />

                        <CustomForm
                            placeholder="Nickname"
                            value={currentClient.nickName}
                            onChange={(e) => setCurrentClient({ ...currentClient, nickName: e.currentTarget.value })}
                        />
                        <div className={styles.doubleInput}>
                            <div >
                                <CustomForm
                                    placeholder="Country code"
                                    value={currentClient.countryCode}
                                    onChange={(e) => setCurrentClient({ ...currentClient, countryCode: util.numberMask(e.currentTarget.value) })}
                                />

                            </div>
                            <div >
                                <CustomForm
                                    placeholder="Phone"
                                    value={currentClient.phone}
                                    onChange={(e) => setCurrentClient({ ...currentClient, phone: util.phoneMask(e.currentTarget.value) })}
                                />
                            </div>
                        </div>
                        <div className={styles.doubleInput}>
                            <div >
                                <CustomForm
                                    placeholder="Zip code"
                                    value={currentClient.zipCode}
                                    onChange={(e) => setCurrentClient({ ...currentClient, zipCode: util.cepMask(e.currentTarget.value) })}
                                    onBlur={() => { getAddress() }}
                                />

                            </div>

                            <a
                                href='https://buscacepinter.correios.com.br/app/endereco/index.php'
                                target='_blank'
                            >
                                I don't know my zip code.
                            </a>
                        </div>
                        <div className={styles.doubleInput}>
                            <div >
                                <CustomForm
                                    placeholder="Block"
                                    value={currentClient.block!}
                                    disabled
                                />

                            </div>
                            <div >
                                <CustomForm
                                    placeholder="Neighborhood"
                                    value={currentClient.neighborhood!}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className={styles.doubleInput}>
                            <div >
                                <CustomForm
                                    placeholder="City"
                                    value={currentClient.city!}
                                    disabled
                                />

                            </div>
                            <div >
                                <CustomForm
                                    placeholder="State"
                                    value={currentClient.state!}
                                    disabled
                                />
                            </div>
                        </div>

                        {
                            error ?
                                <InputError message={errorMessage} />
                                :
                                <div style={{ margin: 20 }}>

                                </div>
                        }
                        <div className={styles.buttonContainer}>
                            <button className={styles.deleteButton} onClick={handleDeleteUser}>
                                Delete
                            </button>

                            <button className={styles.saveButton} onClick={handleUpdateUser}>
                                Save
                            </button>
                        </div>
                    </div>

                    :

                    <div>
                        <div>{confirmationMessage}</div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.deleteButton} onClick={() => { setModalType('update') }}>
                                Cancel
                            </button>
                            <button className={styles.saveButton} onClick={() => { handleConfirmDeleteClient() }}>
                                Confirm
                            </button>
                        </div>
                    </div>
            }
        </Modal>
    )
}