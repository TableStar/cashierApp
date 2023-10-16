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
  Image,
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
import { Link } from "react-router-dom";
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

const MenuManage = () => {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inRole, setInRole] = useState("");
  const [foodMenu, setFoodMenu] = useState([]);
  const { isOpenModal, onToggleOpen, onToggleClose } = useToggle();
  const [inFoodName, setInFoodName] = useState("");
  const [inFoodPrice, setInFoodPrice] = useState(0);
  const [inFoodType, setInFoodType] = useState("");
  const [inFoodPic, setInFoodPic] = useState("");
  const [inFoodStatus, setInFoodStatus] = useState(null);

  const onSaveFood = () => {
    if (inFoodName && inFoodPrice && inFoodType && inFoodPic && inFoodStatus) {
      axios
        .post(API_URL + `/foodMenu`, {
          text: inFoodName,
          price: parseInt(inFoodPrice),
          type: inFoodType,
          gambar: inFoodPic,
          isReady: inFoodStatus,
        })
        .then((response) => {
          console.log("Response Add Account", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return alert("its fuckin empty");
    }
  };
  const removeFoodMenu = (data) => {
    const idx = foodMenu.findIndex((val) => val.id === data.id);
    axios
      .delete(API_URL + `/foodmenu/${data}`)
      .then((response) => {
        getFoodMenu();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFoodMenu = () => {
    axios
      .get(`http://localhost:2023/foodMenu`)
      .then((response) => {
        setFoodMenu(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getFoodMenu();
  }, []);

  const PrintTableFood = () => {
    return foodMenu.map((val, idx) => (
      <Tr key={val.id}>
        <Td>{val.id}</Td>
        <Td>{val.text}</Td>
        <Td>Rp {val.price.toLocaleString("id-ID")}</Td>
        <Td>{val.type}</Td>
        <Td>
          <Image src={val.gambar} alt={val.text} boxSize={"100px"} />
        </Td>
        <Td>{val.isReady ? "Tersedia" : "Tidak Tersedia"}</Td>
        <Td>
          <ButtonGroup>
            <Button>Edit</Button>
            <Button onClick={() => {
              removeFoodMenu(val.id)
            }}>Delete</Button>
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
        <Text fontSize={"3xl"}>MANAGE MENU</Text>
        <Flex justifyContent={"space-between"} gap={"8"} my={"8"}>
          <InputGroup width={["full", "sm"]}>
            <InputLeftAddon children={<BiSearch />} />
            <Input type="text" placeholder="Search your Food" />
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
            <ModalHeader>Add new Food</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Nama Makanan</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => {
                    setInFoodName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Harga</FormLabel>
                <Input
                  type="number"
                  onChange={(e) => {
                    setInFoodPrice(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  onChange={(e) => {
                    setInFoodType(e.target.value);
                  }}
                  icon={<MdArrowDropDown />}
                >
                  <option value="Hot">Hot</option>
                  <option value="Drink">Drink</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Borgar</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Gambar</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan Alamat Gambar"
                  onChange={(e) => {
                    setInFoodPic(e.target.value);
                  }}
                />
              </FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                onChange={(e) => {
                  setInFoodStatus(e.target.value);
                }}
                icon={<MdArrowDropDown />}
              >
                <option value={true}>Tersedia</option>
                <option value={false}>Tidak Tersedia</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={onSaveFood}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Food List</TableCaption>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Nama</Th>
                <Th>Harga</Th>
                <Th>Type</Th>
                <Th>Gambar</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>{PrintTableFood()}</Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </LayoutPage>
  );
};
export default MenuManage;
