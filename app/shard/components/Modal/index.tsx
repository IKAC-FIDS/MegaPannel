import React, {ReactNode} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalProps,
    Button,
    useDisclosure,
    RadioGroup,
    Radio,
    Tooltip
} from "@nextui-org/react";
import {EyeIcon} from "@/app/card/EyeIcon";

interface OpenModalProps extends ModalProps {
    children: ReactNode
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined
}

const ModalComponent: React.FC<OpenModalProps> = ({children, size}: OpenModalProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

    return (
        <div className="flex flex-col gap-2">
            <Tooltip content="جزئیات">
                <Button variant={"light"} onPress={onOpen} className={"text-blue-700"}>
                    مشاهده جزئیات
                </Button>

                {/*<Button isIconOnly onPress={onOpen}>*/}
                {/*    <EyeIcon/>*/}
                {/*</Button>*/}
            </Tooltip>
            <Modal
                size={size ?? "4xl"}
                backdrop={"blur"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior={scrollBehavior}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                جزئیات
                            </ModalHeader>
                            <ModalBody>

                                {children}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    بستن
                                </Button>
                                {/*<Button color="primary" onPress={onClose}>*/}
                                {/*    Action*/}
                                {/*</Button>*/}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
export default ModalComponent