interface StatusProps {
    status?: any
    counter?: any
}

const StatusConverter = ({status, counter}: StatusProps) => {

    return (
        <>
            <div className={'w-56 h-14 bg-violet-400 flex justify-between rounded-lg p-8 items-center'}>
                <div>{status}faal</div>
                <div>{counter} 5</div>
            </div>
        </>
    )
}
export default StatusConverter