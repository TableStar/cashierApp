import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  ButtonGroup,
  Stack,
  HStack,
  VStack,
  Text,
  Grid,
  Spacer,
  Box,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { SiWindows } from "react-icons/si";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";
import useToggle from "../hooks/useToggle";
import { API_URL } from "../helper";
import LayoutPage from "../components/LayoutPage";

const Manage = () => {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inRole, setInRole] = useState("");
  const [inAccount, setInAccount] = useState([]);
  const { isOpenModal, onToggleOpen, onToggleClose } = useToggle();
  const navigate = useNavigate();
  const getAccount = () => {
    axios
      .get("http://localhost:2021/account")
      .then((response) => {
        setInAccount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSave = async () => {
    try {
      if (inUsername && inPassword && inRole) {
        //memeriksa apakah akun sudah terdaftar berdasarkan username
        const resGET = await axios.get(
          API_URL + `/account?username=${inUsername}`
        );
        console.log("RESGET", resGET.data);
        if (!resGET.data.length) {
          await axios.post(API_URL + `/account`, {
            username: inUsername,
            password: inPassword,
            role: inRole,
          });
          alert("Add account success")
        } else {
          alert(`Account Already Exist`);
        }
      } else {
        alert(`Fill in all form`);
      }
    } catch (error) {
      console.log(error);
    }
    /*console.log(inUsername, inPassword, inRole);
    if (inUsername && inPassword && inRole) {
      axios
        .get(API_URL + `/account?username=${inUsername}`)
        .then((response) => {
          console.log("CEK ACCOUNT", response.data);
          if (response.data.length) {
            alert(`Account already exist`);
          } else {
            axios
              .post(API_URL + `/account`, {
                username: inUsername,
                password: inPassword,
                role: inRole,
              })
              .then((resPOST) => {
                console.log("Response Add Account", response.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return alert("its fuckin empty");
    }*/
  };
  useEffect(() => {
    getAccount();
  }, []);
  const PrintTableAccount = () => {
    return inAccount.map((val, idx) => (
      <Tr key={val.id}>
        <Td>{val.id}</Td>
        <Td>{val.username}</Td>
        <Td>{val.password}</Td>
        <Td>{val.role}</Td>
        <Td>
          <ButtonGroup>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </ButtonGroup>
        </Td>
      </Tr>
    ));
  };
  return (
    <LayoutPage>
      <Flex
        bg={"white"}
        flexDirection={"column"}
        minWidth={"800px"}
        padding={"10px"}
      >
        <Text fontSize={"3xl"}>MANAGE</Text>
        <Flex justifyContent={"space-between"} gap={"8"} my={"8"}>
          <InputGroup width={["full", "sm"]}>
            <InputLeftAddon children={<BiSearch />} />
            <Input type="text" placeholder="Search your Account" />
          </InputGroup>
          <Button
            type="button"
            colorScheme="red"
            onClick={onToggleOpen}
            leftIcon={<AiOutlinePlus />}
          >
            Add
          </Button>
        </Flex>
        <Modal isOpen={isOpenModal} onClose={onToggleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new Account</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => {
                    setInUsername(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => {
                    setInPassword(e.target.value);
                  }}
                />
              </FormControl>
              <FormLabel>Role</FormLabel>
              <Select
                onChange={(e) => {
                  setInRole(e.target.value);
                }}
                icon={<MdArrowDropDown />}
              >
                <option value="spv">SPV</option>
                <option value="cashier">Cashier</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={onSave}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Account List</TableCaption>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Username</Th>
                <Th>Password</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>{PrintTableAccount()}</Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </LayoutPage>
  );
};
export default Manage;
