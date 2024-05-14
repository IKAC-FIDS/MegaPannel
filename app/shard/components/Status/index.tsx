import {Chip, ChipProps} from "@nextui-org/react";
interface StatusProps extends ChipProps{

}
interface CustomStatusProps{
    title:string
}
const Status:React.FC<StatusProps> = ({...props}) => {
  return(
      <>
        <Chip classNames={{base: "rounded-md"}}
              {...props}/>
      </>
  )
}
export default Status