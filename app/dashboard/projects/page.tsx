'use client';

import React, { useEffect, useState } from 'react';
import CreateNewProject from '@/components/CreateNewProject';
import ProjectItem from '@/components/ProjectItem';
import { useAuth } from '@/contexts/AuthContext';
import {getUserProjectSettings} from "@/actions/getUserProjectSettings";
import {ProjectSettings} from "@/types/types";
import { AnimatePresence } from 'framer-motion';
import BasicToast from '@/components/smoothui/ui/BasicToast';
import { ToastType } from '@/components/smoothui/ui/BasicToast';
import { getSubscriptionStatus } from '@/actions/getSubscriptionStatus';
import UpgradeModal from '@/components/UpgradeModal';

export type SubscriptionStatus = {
  authenticated: boolean;
  subscribed: boolean;
  subscription: {
    status: string | null;
    customerId: string | null;
    planId: string | null;
    renewsAt: number | null;
  } | null;
};


const Page = () => {
    const { user, loading: userLoading } = useAuth();
    const [projects, setProjects] = useState<{id:string; createdAt: {seconds: number; nanoseconds: number}; settings: ProjectSettings}[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<ToastType>("success")
    const [message, setMessage] = useState("");
    const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null)
    const [openModal, setOpenModal] = useState(false)

    

    const handleShowToast = (type:ToastType, message:string) => {
        setMessage(message)
        setToastType(type)
        setShowToast(true)
    }


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
    }, [ user, userLoading]);

    useEffect(() => {
      async function loadSub() {
            const token = await user?.getIdToken();
            const result = await getSubscriptionStatus(token);
            setSubscription(result)
        }

      loadSub()

    }, [projects, user])

    // useEffect(() => {
    //   console.log(projects)
    // }, [projects])


    return (
        <div
            className={`w-[90%] max-md:w-full rounded-t-lg border-t border-l 
        border-r border-slate-500/20 h-full px-7 max-md:px-2 pt-4 flex flex-col gap-4`}
        >
            <h1 className="font-semibold text-2xl">Projects</h1>

            <div className="flex">
            {(!subscription?.subscribed && projects.length >= 1)
                ? <CreateNewProject openModal={setOpenModal} />
                : <CreateNewProject />
            }
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
                            handleShowToast={handleShowToast}
                        />
                    ))}
            </div>
            <AnimatePresence>
                {showToast && (
                <BasicToast
                    message={message}
                    type={toastType}
                    duration={3000}
                    onClose={() => setShowToast(false)}
                />
                )}
            </AnimatePresence>
            <UpgradeModal addon='You can only create <strong>1 Project</strong>.' isOpen={openModal} setIsOpen={setOpenModal}/>

        </div>
    );
};

export default Page;
