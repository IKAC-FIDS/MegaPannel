import Image from "next/image";
import Example from "@/app/shard/assets/icons/person.svg"

const AnalyticCard = () => {
  return(
      <>
          <div className={'w-80  rounded-md h-36 px-3 bg-white'}>
              <div className={"flex w-full h-1/2 justify-between relative"}>
                  <div>
                      <Image className={'absolute bottom-9'} src={Example.src} alt={"ExampleIcon"} width={64} height={64}/>
                  </div>
                  <div className={'flex flex-col items-end '}>
                      <div>Bookings</div>
                      <div className={'text-xl font-bold text-blue-300'}>281</div>
                  </div>
              </div>

              <div className={'flex h-1/2 items-center'}>
                    <div className={'text-green-500'}>+55%</div>
                  <div>than last week</div>
              </div>
          </div>
      </>
  )
}
export default AnalyticCard