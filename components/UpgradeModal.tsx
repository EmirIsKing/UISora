import React from 'react'
import BasicModal from './smoothui/ui/BasicModal'

const UpgradeModal = ({addon, isOpen, setIsOpen}:{addon?:string; isOpen:boolean; setIsOpen:(bool:boolean)=>void}) => {
  return (
    <BasicModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Upgrade Required"
  size="md"
>
  <div className="flex flex-col gap-4">
    <p
        className="text-sm text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{
            __html: `You're currently on the <strong>Free Plan.</strong> ${addon ?? ""}`
        }}
    />


    <div className="flex flex-col gap-2">
      <h4 className="font-medium">Upgrading Gives You:</h4>
      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
        <li>Unlimited projects</li>
        <li>Unlimited screens</li>
        <li>50,000 monthly credits (recurring)</li>
        <li>Exports enabled (images and UI files)</li>
        <li>Priority email support</li>
      </ul>
    </div>

    <div className="mt-4 flex justify-end gap-2">
      <button
        onClick={() => setIsOpen(false)}
        className="hover:scale-[0.98] cursor-pointer rounded-lg border px-4 py-2 transition-colors"
      >
        Not now
      </button>

      <button
        onClick={() => {
          // Replace with your upgrade route
          window.location.href = "/pricing";
        }}
        className="bg-purple-blue hover:scale-[0.98] cursor-pointer rounded-lg px-4 py-2 text-white transition-colors"
      >
        Upgrade Plan
      </button>
    </div>
  </div>
</BasicModal>

  )
}

export default UpgradeModal
