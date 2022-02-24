import { Value } from 'sass'
import styles from './styles.module.scss'

interface FormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string
    value: string
}

export function CustomForm({ placeholder, value, ...rest }: FormProps) {
    return (
        <form className={styles.formContent}>
            <label>{placeholder}</label>
            <input
                placeholder={placeholder}
                value={value}
                {...rest}
            />
        </form>
    )
}