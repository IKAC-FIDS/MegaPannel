

import  {Button as NextUiButton}  from "@nextui-org/button";
import {ButtonProps} from "@nextui-org/button";
interface SubmitButtonProps extends ButtonProps{

}


const Button:React.FC<SubmitButtonProps>= ({...props }:SubmitButtonProps) => {
    return (
        <NextUiButton {...props}/>

    );
};



export default Button;

