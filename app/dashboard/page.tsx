'use client'
import Button from "@/app/shard/components/Button";
import Status from "@/app/shard/components/Status";
import TotalCard from "@/app/shard/components/TotalCard";


const AdminHomePage = () => {
    const statusExample = 'Completed'
    return (
        <>
            <div>

                <h1>Dashboard</h1>

                <div className={'mb-2'}>
                    <Button variant={"bordered"} color={"primary"} onClick={() => {
                        console.log("onClick is don")
                    }}>
                        click
                    </Button>
                </div>
                <Status color={statusExample === "Completed" ? "danger" : "primary"} className={'mb-8'}
                        variant={"flat"}>Completed</Status>
                {/*<AnalyticCard/>*/}
                <Status>lasdk;ls</Status>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>
                <TotalCard/>

                {/*<InputComponent  type={"tel"}/>*/}
            </div>
        </>
    )
}
export default AdminHomePage