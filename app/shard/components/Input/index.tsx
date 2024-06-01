import {InputVariantProps} from "@nextui-org/react";
import {Input} from "@nextui-org/input";

interface InputProps extends InputVariantProps {

}

const InputComponent: React.FC<InputProps> = ({...props}, placeholder: InputProps) => {
    return (


        <>
            {/*<Input type {...props}/>*/}
            <div className={'flex text-start w-full h-auto'}>

                <Input   {...props} />
            </div>
        </>

    )
}
export default InputComponent