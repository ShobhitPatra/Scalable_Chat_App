import Button from "./Button"
import InputBox from "./InputBox"
import Messages from "./Messages"

const Dashboard =()=>{
    return (
        <>
        <div className="h-screen bg-slate-500 flex justify-center items-center rounded-md" >
            <div className="bg-slate-200">

            <Messages/>
            <div className="flex">
                <InputBox/>
                <Button/>
            </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard