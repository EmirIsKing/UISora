'use client'
import React,{useState} from 'react'
import {Plus} from 'lucide-react'
import {Button} from "@heroui/button";
//import { v4 as uuidv4 } from 'uuid';
import {useRouter} from "next/navigation";
import {createNewProject} from '@/actions/createNewProject'
import Loader from './Loader'
import { useAuth } from '@/contexts/AuthContext'

const CreateNewProject = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();



    const handleCreateProject  = async () => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }
        
        setLoading(true);
        try {
            const newProjectId = await createNewProject(user.uid);
            console.log('New Project ID:', newProjectId);
            router.push(`/project/${newProjectId}`);
        } catch (error) {
            console.error('Error creating project:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Button 
            onPress={()=>handleCreateProject()} 
            disabled={loading}
            className={`flex flex-col justify-center items-center w-[190px] h-[150px]
            rounded-sm bg-purple-blue p-3 cursor-pointer text-white hover:bg-purple-blue/90
            transition-all duration-300 shadow-lg max-md:w-full max-md:h-[90px] disabled:opacity-50 disabled:cursor-not-allowed`}>
            {loading ? (<Loader className={'w-10 h-10 max-md:w-5 max-md:h-5'}/>) : (
                <div className={`w-8 h-8 border-2 rounded-full flex justify-center items-center border-dashed 
            border-white
            `}>
                    <Plus/>
                </div>
            )}
            <span>Create New Project</span>
        </Button>
    )
}
export default CreateNewProject
