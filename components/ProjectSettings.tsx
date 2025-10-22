import React,{useState} from 'react'
import {setProjectSettings} from "@/actions/setProjectSettings";
import {Button} from "@heroui/button";
import { ProjectSettingsWithId} from "@/actions/getProjectDetails";
import Loader from '@/components/Loader'

const ProjectSettings = ({toggleSettings, projectDetails, setProjectNameOptimistic}:{toggleSettings:()=>void; projectDetails: ProjectSettingsWithId | null; setProjectNameOptimistic:(value:string)=>void}) => {


    const [projectName, setProjectName] = useState(projectDetails?.settings?.projectName ?? '');
    const [projectDescription, setProjectDescription] = useState(projectDetails?.settings.description);
    const [projectVisibility, setProjectVisibility] = useState(projectDetails?.settings.visibility ?? 'private');
    const [loading, setLoading] = useState(false)

    const saveSettings = async () => {
        try {
            setLoading(true)
            const response = await setProjectSettings(
                projectDetails?.id ?? '',
                {
                    projectName: projectName || "New Project",
                    visibility: projectVisibility,
                    description: projectDescription || "No Description",
                }
            );
            setLoading(false)
            setProjectNameOptimistic(projectName)
            toggleSettings();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    const handleSave = () => {
        saveSettings();
    }


    return (
        <div onClick={toggleSettings}  className={'absolute flex top-0 backdrop-blur-xs justify-center items-center h-screen w-full text-black'}>
            <div className="relative flex justify-center items-center w-full h-full">
                <div onClick={(e) => e.stopPropagation()} className={'p-5 bg-white rounded-xl shadow-md gap-5 border-black border w-1/4 max-md:w-[80%]'}>
                    <h2 className="text-xl text-center font-bold text-gray-800">Project Settings</h2>

                    <div className="grid gap-6 w-full max-w-xl mx-auto mt-3">
                        {/* Project Name */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="font-medium">Project Name:</label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="font-medium">Description:</label>
                            <textarea
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        {/* Visibility */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-medium">Visibility:</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="private"
                                        checked={projectVisibility !== "public"}
                                        onChange={() => setProjectVisibility("private")}
                                        className="border-gray-300"
                                    />
                                    <span>Private</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="public"
                                        checked={projectVisibility === "public"}
                                        onChange={() => setProjectVisibility("public")}
                                        className="border-gray-300"
                                    />
                                    <span>Public</span>
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className={'w-full flex justify-center items-center mt-2'}>
                        <Button onPress={()=>handleSave()}
                                className="w-[50%] mt-2 bg-black/90 flex justify-center items-center rounded-md text-white py-2 cursor-pointer hover:shadow-xl hover:opacity-95 active:opacity-90">
                            {loading ? <Loader className={'w-5 h-5'}/> : 'Save'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProjectSettings
