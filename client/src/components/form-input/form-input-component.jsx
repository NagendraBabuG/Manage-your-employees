import './form-input-style.scss'
const FormInput = ({label, ...otherLabels})=> {
        return (
            <div className="group">
                {label &&
                (<label className={`${otherLabels.value.length > 0 ? 'shrink':''} form-input-label`}>
                    {label}
                </label>)}
                <input className='form-input' {...otherLabels}/>
            </div>
        )
}
export default FormInput;