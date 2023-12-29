import useFormContext from "../context/FormContext"
import FormAuthenthication from "./FormAuthenthication";
import FormPersonalDetails from "./FormPersonalDetails";
function FormInputs({errors}){
    const { page } = useFormContext();
    const display = {
        0: <FormAuthenthication errors={errors} />,
        1: <FormPersonalDetails errors={errors}/>
    }
    console.log(page);
    const content = (
       <>
            {display[page]}
       </>
    )
return (
    content
)
}
export default FormInputs;