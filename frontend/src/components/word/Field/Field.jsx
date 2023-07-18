import style from "./Field.module.css"

const Field = props => {

    // eslint-disable-next-line react/prop-types
    const {value, status} = props

    let statusStyle

    if(status === "perfect") statusStyle = style.perfect
    if(status === "good") statusStyle = style.good
    if(status === "wrong") statusStyle = style.wrong

    return (
        <div className={`${style.field} ${statusStyle}`}>{value}</div>
    )
}

export default Field