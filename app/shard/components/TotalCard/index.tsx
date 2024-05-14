import Image from "next/image";
import Example from "@/app/shard/assets/icons/person.svg"
const TotalCard = () => {
  return(
      <>
      <div className={"w-80  rounded-md h-36 p-3 bg-white"}>
          <div className={"flex justify-between h-1/2 items-center"}>
              <div>
                  <div>Total User</div>
                  <div className={"text-xl font-bold"}>40,689</div>
              </div>
              <div>
                  <Image src={Example.src} alt={"Example"} width={60} height={60}/>
              </div>
          </div>
          <div className={'flex gap-0.5 items-center h-1/2'}>
              <div className={'text-green-500'}>+55%</div>
              <div>than last week</div>
          </div>
      </div>
      </>
  )
}
export default TotalCard