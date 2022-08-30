import { ClientProps } from '../Form'
import styles from './styles.module.scss'
interface ListComponentProps {
    data: ClientProps,
    counter: number
    onClick: () => void
}

export function ListComponent({ counter, data, onClick }: ListComponentProps) {
    return (
        <article className={styles.container} onClick={onClick} >
            <span>#{counter}</span>
            <p className={styles.name}>{data.firstName} {data.lastName}</p>
            <p className={styles.phone}>{data.phone}</p>
            <p className={styles.location}>{data.city} - {data.state}</p>
        </article>
    )
}