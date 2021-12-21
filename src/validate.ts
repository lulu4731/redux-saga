import { FormErrors } from "redux-form"
interface ValidateTask{
    title: string
    description: string
}

const validate = (values: ValidateTask): FormErrors<ValidateTask> => {
    const errors: FormErrors<ValidateTask> = {};
    const {title} = values
    if(!title){
        errors['title'] = 'Vui long nhap tieu de'
    }else if(title.trim().length < 5){
        errors.title = 'It nhap 5 ki tu'
    }
    return errors

}
export default validate