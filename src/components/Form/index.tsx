import { useState } from "react";
import { Button } from "../../components/Button";
import { CustomForm } from "../../components/CustomForm";
import axios, { AxiosError } from 'axios'
import { InputError } from "../../components/InputError";
import { useClient } from "../../hooks/useClient";
import util from '../../util'
import { v4 as uuid } from 'uuid'
import { useModal } from "../../hooks/useModal";
import styles from './styles.module.scss'
export interface ClientProps {
    id: string;
    firstName: string,
    lastName: string,
    nickName: string,
    countryCode: string,
    phone: string,
    zipCode: string,
    city?: string,
    state?: string,
    neighborhood?: string,
    block?: string,
}
export interface AddressProps {
    cep: string,
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string,
}

export function Form() {
    const [client, setClient] = useState<ClientProps>({} as ClientProps)
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { handleRegisterClient } = useClient()
    const { setNotificationModal, setNotificationMessage } = useModal()

    async function handleRegisterNewClient() {
        if (
            client.firstName === undefined ||
            client.lastName === undefined ||
            client.firstName === '' ||
            client.lastName === ''
        ) {
            setErrorMessage('Please, tell us the client name.')
            setError(true)
            return
        }

        if (client.nickName === undefined || client.nickName === '') {
            setErrorMessage('Please, tell us the client nickname.')
            setError(true)
            return
        }

        if (client.phone.length < 15) {
            setErrorMessage('Please, insert a valid number.')
            setError(true)
            return
        }

        if (client.countryCode === undefined || client.countryCode === '') {
            setErrorMessage('Please, tell us the client country code.')
            setError(true)
            return
        }

        if (client.zipCode === undefined || client.zipCode === '') {
            setErrorMessage('Please, tell us the client zip code.')
            setError(true)
            return
        }

        let address = {} as AddressProps

        let response = await axios.get(`https://viacep.com.br/ws/${client.zipCode}/json/`)
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

        setIsLoading(true)
        setError(false)
        setErrorMessage('')

        if (response) {
            const newClient = {
                ...client,
                id: uuid(),
                block: address.logradouro,
                city: address.localidade,
                neighborhood: address.bairro,
                state: address.uf
            } as ClientProps

            handleRegisterClient(newClient)
            setNotificationMessage('Client registration successful.')
            setNotificationModal(true)
            setClient({
                id: '',
                firstName: '',
                lastName: '',
                countryCode: '',
                nickName: '',
                phone: '',
                zipCode: ''
            })

        } else {
            setErrorMessage('Please, insert a valid zip code.')
            setError(true)
        }

        setIsLoading(false)
    }

    return (
        <section className={styles.container}>
            <h1>Register all your clients and stay in controll.</h1>
            <div className={styles.content}>
                <CustomForm
                    placeholder="First name"
                    value={client.firstName}
                    onChange={(e) => setClient({ ...client, firstName: util.nameMask(e.currentTarget.value) })}
                />
                <CustomForm
                    placeholder="Last name"
                    value={client.lastName}
                    onChange={(e) => setClient({ ...client, lastName: util.nameMask(e.currentTarget.value) })}
                />

                <CustomForm
                    placeholder="Nickname"
                    value={client.nickName}
                    onChange={(e) => setClient({ ...client, nickName: e.currentTarget.value })}
                />
                <div className={styles.doubleInput}>
                    <div >
                        <CustomForm
                            placeholder="Country code"
                            value={client.countryCode}
                            onChange={(e) => setClient({ ...client, countryCode: util.numberMask(e.currentTarget.value) })}
                        />

                    </div>
                    <div >
                        <CustomForm
                            placeholder="Phone"
                            value={client.phone}
                            onChange={(e) => setClient({ ...client, phone: util.phoneMask(e.currentTarget.value) })}
                        />
                    </div>
                </div>
                <div className={styles.doubleInput}>
                    <div >
                        <CustomForm
                            placeholder="Zip code"
                            value={client.zipCode}
                            onChange={(e) => setClient({ ...client, zipCode: util.cepMask(e.currentTarget.value) })}
                        />

                    </div>

                    <a
                        href='https://buscacepinter.correios.com.br/app/endereco/index.php'
                        target='_blank'
                    >
                        I don't know my zip code.
                    </a>
                </div>
            </div>
            {
                error ?
                    <InputError message={errorMessage} />
                    :
                    <div style={{ margin: 20 }}>

                    </div>
            }
            <Button
                onClick={() => {
                    handleRegisterNewClient()
                }}
                title='Register'
                loading={isLoading}
            />
        </section>
    )
}