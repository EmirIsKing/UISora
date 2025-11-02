import React from 'react'
import {Button} from "@heroui/button";
//import Loader from '@/components/Loader'

const ProjectInfo = ({toggleSettings}:{toggleSettings:()=>void;}) => {


    // const [loading, setLoading] = useState(false)

    // const getInfo = async () => {
    //     try {
    //         setLoading(true)
    //         setLoading(false)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    const handleClose = () => {
        toggleSettings();
    }


    return (
        <div onClick={toggleSettings}  className={'absolute flex  top-0  backdrop-blur-xs justify-center items-center h-screen w-full '}>
            <div className=" relative flex justify-center items-center w-full h-full">
                <div onClick={(e) => e.stopPropagation()} className={'p-5 bg-white rounded-xl shadow-md gap-5 border-black border w-1/4'}>
                    <h2 className="text-xl text-center font-bold text-gray-800">Project Settings</h2>

                    <div className="grid gap-6 w-full max-w-xl mx-auto mt-3">
                        credit remaining
                        Project Used
                    </div>


                    <div className={'w-full flex justify-center items-center mt-2'}>
                        <Button onPress={()=>handleClose()}
                                className="w-[50%] mt-2 bg-black/90 flex justify-center items-center rounded-md text-white py-2 cursor-pointer hover:shadow-xl hover:opacity-95 active:opacity-90">
                            {/* {loading ? <Loader className={'w-5 h-5'}/> : 'Close'} */}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProjectInfo
