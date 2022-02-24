import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useClient } from "../../hooks/useClient";
import { useModal } from "../../hooks/useModal";
import { ClientProps } from "../Form";
import { ListComponent } from "../ListComponent";

import styles from './styles.module.scss'


export function List() {
    const { clients, getClients, setCurrentClient } = useClient()
    const { setEditClientModal } = useModal()

    useEffect(() => {
        getClients()
    }, [])

    function openModal(client: ClientProps) {
        setCurrentClient({ ...client })
        setEditClientModal(true)
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            setEditClientModal(false)
        }
    })

    return (
        <section className={styles.container}>
            <h1>Here is all your clients.</h1>
            <div className={styles.content}>
                <table>
                    {
                        clients.length !== 0 &&
                        <tr className={styles.list}>
                            <th className={styles.id}>ID</th>
                            <th className={styles.name}>Name</th>
                            <th className={styles.nickname}>Nickname</th>
                            <th className={styles.phone}>Phone</th>
                            <th className={styles.city}>City</th>
                        </tr>
                    }

                    {
                        clients.length !== 0 ?


                            clients.map((client, k) => {
                                return (
                                    <tr key={k} className={styles.list} onClick={() => { openModal(client) }}>
                                        <td className={styles.id}>#{k + 1}</td>
                                        <td className={styles.name}>{client.firstName} {client.lastName}</td>
                                        <td className={styles.nickname}> {client.nickName}</td>
                                        <td className={styles.phone}>+{client.countryCode} {client.phone}</td>
                                        <td className={styles.city}>{client.city}</td>
                                    </tr>
                                    // <ListComponent key={k} counter={k + 1} data={client} onClick={() => {
                                    //     openModal(client)
                                    // }} />
                                )
                            })

                            :

                            <p>We didn't find any clients.</p>
                    }
                </table>

            </div>
        </section>
    )
}