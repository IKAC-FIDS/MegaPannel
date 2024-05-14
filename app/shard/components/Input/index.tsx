import {InputVariantProps} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
interface InputProps extends InputVariantProps{
    placeholder?:string
}
const InputComponent:React.FC<InputProps> = ({...props},placeholder :InputProps) => {
  return(

      // <>
      //     <label htmlFor="firstName" className={' p-1 border-b-4'}>
      //         First name :
      //         <input type="text" id="firstName" className={"focus:outline-none ml-4"}/>
      //     </label>
      //     <label htmlFor="lname" className={'border-b-4 p-1'}>
      //         Last name:
      //         <input type="text" id="lname" className={"focus:outline-none ml-4"}/>
      //     </label></>
      <>
          {/*<Input type {...props}/>*/}
          <Input  {...props}  />
      </>

  )
}
export default InputComponent