'use client'
import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown"
import { Ellipsis, Trash2 } from 'lucide-react'
import { Button } from "@heroui/button"
import { ProjectSettings } from "@/types/types"
import { useRouter } from "next/navigation"
import { deleteProject } from "@/actions/deleteProject"
import { auth } from '@/utils/firebase'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ProjectItem = ({
  project,
  allProjects,
  setProjects
}: {
  project: { id: string; settings: ProjectSettings }
  allProjects: any
  setProjects: any
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    router.push(`/project/${project.id}`)
  }

  const handleDelete = async (projectId: string) => {
    const user = auth.currentUser
    if (!user) return alert("You must be logged in to delete projects")

    try {
      setLoading(true)
      await deleteProject(user.uid, projectId)
      const updatedProjects = allProjects.filter((p: any) => p.id !== projectId)
      setProjects(updatedProjects)
      alert("Project deleted!")
    } catch (err: any) {
      alert(`Failed to delete project: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col justify-between w-[200px] max-md:w-[190px] h-[160px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer p-4 hover:bg-gradient-to-br hover:from-slate-50 hover:to-slate-100 dark:hover:from-[#1E293B] dark:hover:to-[#0F172A]`}
    >
      {/* Dropdown Menu */}
      <div className="absolute top-2 right-2 z-10">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button
              isIconOnly
              size="sm"
              className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Ellipsis size={16} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Project Actions">
            <DropdownItem
              key="delete"
              className="flex items-center gap-2 text-red-500 font-medium hover:bg-red-500/10 transition-colors"
              onPress={() => handleDelete(project.id)}
            >
              <Trash2 size={14} />
              {loading ? "Deleting..." : "Delete Project"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Project Details */}
      <div>
        <h1 className="text-lg font-semibold text-slate-800 dark:text-white truncate mb-1">
          {project.settings.projectName || "Untitled Project"}
        </h1>

        {/* Tooltip Description */}

        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <p
                className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 cursor-help"
            >
                {project.settings.description || "No Description"}
            </p>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1E1E1E] text-white dark:bg-white dark:text-black">
            {project.settings.description || "No Description"}
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>

      </div>

      {/* Footer / Timestamp */}
      <div className="text-xs text-slate-400 dark:text-slate-500 mt-3">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  )
}

export default ProjectItem
