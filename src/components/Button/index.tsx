import styles from './styles.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    loading?: boolean
    onClick: () => void
}

export function Button({ onClick, title, loading }: ButtonProps) {
    return (
        <button className={styles.container} onClick={onClick}>
            {
                loading === true ?
                    <div className={styles.loader} />
                    :
                    <p>{title}</p>
            }
        </button>
    )
}