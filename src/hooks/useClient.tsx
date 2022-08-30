import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { ClientProps } from '../components/Form';
import { CLIENTS_KEY } from '../storageKeys';

interface ClientProviderProps {
    children: any;
}

interface ClientContextData {
    handleRegisterClient: (data: ClientProps) => void
    handleUpdateClient: (Client: ClientProps) => void;
    handleDeleteClient: (Client: ClientProps) => void
    getClients: () => void
    clients: ClientProps[]
    currentClient: ClientProps
    setCurrentClient: Dispatch<SetStateAction<ClientProps>>
}

export const ClientContext = createContext(({} as ClientContextData));

function ClientProvider({ children }: ClientProviderProps) {
    const [clients, setClients] = useState<ClientProps[]>([])
    const [currentClient, setCurrentClient] = useState<ClientProps>({} as ClientProps)

    useEffect(() => {
        getClients()
    }, [])

    function handleRegisterClient(data: ClientProps) {
        const clients = localStorage.getItem(CLIENTS_KEY)
        const clientsData = clients !== null && JSON.parse(clients) as ClientProps[]
        let array: ClientProps[] = []

        if (clientsData) {
            array = [...clientsData]
            array.push(data)
            localStorage.setItem(CLIENTS_KEY, JSON.stringify(array))
            return
        }

        array.push(data)

        localStorage.setItem(CLIENTS_KEY, JSON.stringify(array))
    }

    function handleUpdateClient(client: ClientProps) {
        const clients = localStorage.getItem(CLIENTS_KEY)
        const clientsData = JSON.parse(clients!) as ClientProps[]

        const array: ClientProps[] = []

        clientsData.map((item) => {
            if (item.id === client.id) {
                array.push(client)
                return
            }

            array.push(item)
        })

        localStorage.setItem(CLIENTS_KEY, JSON.stringify(array))
        getClients()
    }

    function handleDeleteClient(client: ClientProps) {
        const clients = localStorage.getItem(CLIENTS_KEY)
        const clientsData = JSON.parse(clients!) as ClientProps[]

        const array: ClientProps[] = []

        clientsData.map((item) => {
            if (item.id !== client.id) {
                array.push(item)
            }
        })

        localStorage.setItem(CLIENTS_KEY, JSON.stringify(array))
        getClients()
    }

    function getClients() {
        const clients = localStorage.getItem(CLIENTS_KEY)
        const clientsData = clients !== null && JSON.parse(clients) as ClientProps[]

        if (clientsData) {
            setClients(clientsData)
        }
    }

    return (
        <div>
            <ClientContext.Provider value={{
                handleRegisterClient,
                handleUpdateClient,
                handleDeleteClient,
                getClients,
                clients,
                currentClient,
                setCurrentClient
            }}>
                {children}
            </ClientContext.Provider>
        </div>
    )
}

function useClient() {

    const context = useContext(ClientContext)

    return (
        context
    )
}

export { ClientProvider, useClient }