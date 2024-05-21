import React, {ReactNode} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalProps, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
import { EyeIcon } from "@/app/card/EyeIcon";
interface OpenModalProps extends ModalProps{
    children:ReactNode
}
const ModalComponent : React.FC<OpenModalProps> = ({children}:OpenModalProps)=> {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

    return (
        <div className="flex flex-col gap-2">
            <Button isIconOnly onPress={onOpen}>
                <EyeIcon/>
            </Button>

            <Modal
                size={"4xl"}
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
                                    Close
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