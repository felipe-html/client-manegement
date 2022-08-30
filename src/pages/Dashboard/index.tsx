import { useState } from 'react'
import { Form } from '../../components/Form'
import { List } from '../../components/List'
import styles from './styles.module.scss'

export function Dashboard() {
    const [selectedButton, setSelectedButton] = useState<string>('create')

    return (
        <>
            <header className={styles.headerContainer}>
                <p>Register clients.</p>
                <nav className={styles.headerButtons}>
                    <a
                        className={`${selectedButton === 'create' && styles.selectedButton}`}
                        onClick={() => {
                            setSelectedButton('create')
                        }}
                    >
                        Create
                    </a>

                    <a
                        className={`${selectedButton === 'showAll' && styles.selectedButton}`}
                        onClick={() => {
                            setSelectedButton('showAll')
                        }}
                    >
                        Show all
                    </a>
                </nav>
            </header>

            <main className={styles.mainContainer}>
                {
                    selectedButton === 'create' ? (
                        <Form />
                    ) : (
                        <List />
                    )
                }
            </main>
        </>
    )
}