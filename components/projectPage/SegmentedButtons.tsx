import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

interface SegmentedButtonsProps {
  sidebarToggle: boolean;
  setSidebarToggle: (value: boolean) => void;
}

const SegmentedButtons = ({ sidebarToggle, setSidebarToggle }: SegmentedButtonsProps) => {
  return (
    <div className="
      hidden max-md:flex w-full justify-center
      absolute left-1/2 -translate-x-1/2 bottom-2
      transition-all duration-300 ease-in-out
      z-9999
    ">
      <ButtonGroup className="bg-black rounded-full p-1 shadow-sm font-bold text-white">
        <Button
          onClick={() => setSidebarToggle(true)}
          size="sm"
          className={`
            rounded-full px-5 transition-all duration-200
            ${sidebarToggle
              ? "bg-[#303030] shadow"
              : "hover:bg-[#2b2b2b]"}
          `}
        >
          Chat
        </Button>

        <Button
          onClick={() => setSidebarToggle(false)}
          size="sm"
          className={`
            rounded-full px-5 transition-all duration-200
            ${!sidebarToggle
              ? "bg-[#303030] shadow"
              : "hover:bg-[#2b2b2b]"}
          `}
        >
          Preview
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SegmentedButtons;
