'use client';

import React, { useEffect, useState } from 'react';
import CreateNewProject from '@/components/CreateNewProject';
import ProjectItem from '@/components/ProjectItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';
import { JsonToHtmlRendererProps } from '@/types/types';
import {getUserProjectSettings} from "@/actions/getUserProjectSettings";
import {ProjectSettings} from "@/types/types";


const Page = () => {
    const [user] = useAuthState(auth);
    const [projects, setProjects] = useState<{id:string; settings: ProjectSettings}[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (user) {
                const data = await getUserProjectSettings();
                setProjects(data);
            }
        };

        fetchProjects();
    }, [user]);


    return (
        <div
            className={`w-[90%] max-md:w-full rounded-t-lg border-t border-l 
        border-r border-slate-500/20 h-full px-7 max-md:px-2 pt-4 flex flex-col gap-4`}
        >
            <h1 className="font-semibold text-2xl">Projects</h1>

            <div className="flex">
                <CreateNewProject />
            </div>

            <div
                className="w-full h-[1px] bg-gradient-to-r
        from-white from-30% via-black via-40% to-white to-70%"
            ></div>

            <div className="w-full gap-2 flex flex-wrap overflow-y-auto pb-3">
                {projects.map((project, index) => (
                    <ProjectItem key={index} project={project} />
                ))}
                {projects.length == 0 && <span className={'w-full flex justify-center items-center font-semibold text-xl'}>You have no Projects.</span>}
            </div>
        </div>
    );
};

export default Page;
