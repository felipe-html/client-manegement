import styles from './styles.module.scss'

interface InputErrorProps {
    message: string
}

export function InputError({ message }: InputErrorProps) {
    return (
        <div className={styles.container}>
            <p>{message}</p>
        </div>
    )
}