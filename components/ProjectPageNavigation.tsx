'use client'
import React, {useState} from 'react'
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {PanelLeftCloseIcon, PanelLeftOpen} from "lucide-react";
import {Button} from "@heroui/button";
import {useExportModal} from "@/store/store";


const ProjectPageNavigation = ({sidebarToggle, setSidebarToggle}:{sidebarToggle: boolean; setSidebarToggle: (open: boolean) => void;}) => {


    const toggleExportModal = () => {
        useExportModal.getState().setExportModal(!useExportModal.getState().exportModal);
        console.log(useExportModal.getState().exportModal)
    }


    return (
        <div className={'h-12 bg-slate-100/90 flex items-center text-black/90 px-4 z-[3000] shadow-lg'}>
            <div className={'flex'}>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="px-4 py-2 rounded-md outline-0 hover:opacity-75 transition-all cursor-pointer">
                                Project Name ∨
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-slate-900/90 border border-slate-100/90 text-slate-100/90">
                            <DropdownMenuItem>
                                Credits and info
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100/90 h-px" />
                            <DropdownMenuItem className="hover:bg-slate-800/90">
                                Go to Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-800/90">
                                Project Settings
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <button
                    className={'p-1 hover:bg-slate-100/25 rounded-md transition-all cursor-pointer'}
                    onClick={()=>setSidebarToggle(!sidebarToggle)}>{sidebarToggle ? (<PanelLeftCloseIcon />) : (<PanelLeftOpen/>)}
                </button>
            </div>
            <div className={'flex justify-end flex-1 items-end'}>
                    <Button onPress={()=>toggleExportModal()} className={'bg-white rounded-full px-2 text-black/80 cursor-pointer hover:px-3 transition-all ease-in-out duration-300'}>
                        Export to Figma
                    </Button>
            </div>

        </div>
    )
}
export default ProjectPageNavigation
