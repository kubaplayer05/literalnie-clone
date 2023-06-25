import style from "./Field.module.css"

const Field = props => {

    const {value, status} = props

    return (
        <div className={style.field}>{value}</div>
    )
}

export default Field