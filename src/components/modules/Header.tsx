import {
  Center,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { BaseButton } from "../parts/BaseButton";
import { Context } from "../../store";
import { useContext } from "react";

export const Header = () => {
  const { total } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center bg="choco.500" height="48px" width="100%" justifyContent="center">
        <Spacer />
        <Image src="/title.png" height="24px" />
        <Spacer />
        <IconButton
          aria-label="Info"
          icon={<InfoOutlineIcon />}
          variant="ghost"
          color="white"
          colorScheme="blackAlpha"
          mr="8px"
          onClick={onOpen}
        />
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>これまであなたが集めたお菓子の数は {total}コ！</ModalBody>
          <ModalFooter>
            <BaseButton text="　OK　" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
