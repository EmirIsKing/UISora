'use client';

import React, { useEffect, useState } from 'react';
import CreateNewProject from '@/components/CreateNewProject';
import ProjectItem from '@/components/ProjectItem';
import { useAuth } from '@/contexts/AuthContext';
import { JsonToHtmlRendererProps } from '@/types/types';
import {getUserProjectSettings} from "@/actions/getUserProjectSettings";
import {ProjectSettings} from "@/types/types";


const Page = () => {
    const { user, loading: userLoading } = useAuth();
    const [projects, setProjects] = useState<{id:string; settings: ProjectSettings}[]>([]);
    const [loading, setLoading] = useState<boolean>(false);




    useEffect(() => {
        if (userLoading) return;

        const fetchProjects = async () => {
            setLoading(true);
            if (user) {
                try {
                    const data = await getUserProjectSettings();
                    setProjects(data);
                } catch (error) {
                    console.error("Failed to load projects:", error);
                }

            }
            setLoading(false);
        };

        fetchProjects();
    }, [user, userLoading]);



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

            <div className="w-full gap-3 flex flex-wrap overflow-y-auto pb-3">
                {loading && (
                    <div className="w-full flex justify-center items-center py-10">
                        <div className="loader" />
                    </div>
                )}

                {!userLoading && !loading && projects.length === 0 && (
                    <span className="w-full flex justify-center items-center font-semibold text-xl opacity-70">
                        You have no Projects.
                    </span>
                            )}

                {!loading &&
                    projects.map((project) => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            allProjects={projects}
                            setProjects={setProjects}
                        />
                    ))}
            </div>

        </div>
    );
};

export default Page;
