import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  Heading,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  HStack,
  List,
  ListItem,
  AspectRatio,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Error from "./Error";

const Country = ({ countryData, countryflagcode }) => {
  // const [expanded, setExpanded] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [expandedStates, setExpandedStates] = useState(
    new Array(countryData?.length).fill(false)
  );
  const [selectCountry, setSelectCountry] = useState(null);

  if (!Array.isArray(countryData)) {
    return <Error />;
  }

  const handleExpandClick = (index, country) => {
    const newExpanded = [...expandedStates];
    newExpanded[index] = !newExpanded[index];
    setExpandedStates(newExpanded);
    setSelectCountry(country);
    onOpen();
  };
  console.log(selectCountry);

  return (
    <Box w="80%" m="30px auto">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {countryData?.map((country, ind) => {
          let isExpanded = expandedStates[ind];
          return (
            <Box
              cursor={"pointer"}
              bg="white"
              key={ind}
              p="10px"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              <Box w="100%">
                <Image
                  w="100%"
                  src={country?.flags?.png}
                  alt={country?.flags?.alt}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                color={"rgb(26, 35, 126)"}
                mt="10px"
                textAlign={"left"}
              >
                <Box>
                  <Heading size="md" as="h4">
                    Name : {country?.name?.common}
                  </Heading>
                  <Heading size="sm" as="h4" mt="4px">
                    Capital : {country?.capital[0]}
                  </Heading>

                  <Box>
                    <Button
                      mt="4px"
                      color="rgb(26, 35, 126)"
                      variant="link"
                      onClick={() => handleExpandClick(ind, country)}
                     
                    >
                      See More Info
                    </Button>

                    <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
                      <DrawerOverlay />
                      <DrawerContent bgGradient="linear(to-r, #076585, #fff)">
                        <DrawerCloseButton />
                        {/* <DrawerHeader>{`${'full'} drawer contents`}</DrawerHeader> */}
                        <DrawerBody>
                          {selectCountry && (
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              gap={"80px"}
                            >
                              <Box w="25%">
                                <Image
                                  w="100%"
                                  src={selectCountry?.flags?.png}
                                  alt={selectCountry?.flags?.alt}
                                />
                              </Box>
                              <Box mt="10px">
                                <Box>
                                  <HStack gap="80px">
                                    <Heading
                                      color={"rgb(245, 124, 0)"}
                                      size="md"
                                      as="h4"
                                    >
                                      Common Name :{" "}
                                      {selectCountry?.name?.common}
                                    </Heading>
                                    <Heading
                                      color={"rgb(245, 124, 0)"}
                                      size="md"
                                      as="h4"
                                    >
                                      Official Name :{" "}
                                      {selectCountry?.name?.official}
                                    </Heading>
                                  </HStack>
                                  <Heading color={"#2b5876"} size="md" as="h4">
                                    Capital : {selectCountry?.capital[0]}
                                  </Heading>
                                  <Box fontSize={"18px"} fontWeight={600}>
                                    <Text>
                                      Independent :{" "}
                                      {selectCountry?.independent ? "✔" : "❌"}
                                    </Text>
                                    <Text>
                                      Region : {selectCountry?.region}
                                    </Text>
                                    <Text>
                                      Subregion : {selectCountry?.subregion}
                                    </Text>
                                    <Text>
                                      Borders :{" "}
                                      {selectCountry?.borders.map(
                                        (el) => el + " "
                                      )}
                                    </Text>
                                    <Text>Area : {selectCountry?.area}</Text>
                                    <Text>
                                      Population : {selectCountry?.population}
                                    </Text>
                                    <Text>Flag : {selectCountry?.flag}</Text>
                                    <Text>
                                      Continets :{" "}
                                      {selectCountry?.continents?.map(
                                        (el) => el + " "
                                      )}
                                    </Text>
                                    <Text>
                                      Timezones : {selectCountry?.timezones}
                                    </Text>
                                    <Text>Fifa : {selectCountry?.fifa}</Text>
                                    <Text>
                                      StartOfWeek : {selectCountry?.startOfWeek}
                                    </Text>
                                    <Text>
                                      CarDriveSide : {selectCountry?.car?.side}
                                    </Text>
                                    {/* <Text>Currency : { }</Text> */}

                                    <List>
                                      <Text>Currency :</Text>
                                      {Object.entries(
                                        selectCountry?.currencies
                                      ).map(([currencyCode, currencyinfo]) => (
                                        <ListItem>
                                          {currencyinfo.name}{" "}
                                          {currencyinfo.symbol}
                                        </ListItem>
                                      ))}
                                    </List>
                                    <Text>Maps: </Text>

                                    <a
                                      style={{ color: "#0052D4" }}
                                      href={selectCountry?.maps?.googleMaps}
                                      target="blank"
                                    >
                                      Click to see googleMap
                                    </a>
                                    <br />
                                    <a
                                      style={{ color: "#0052D4" }}
                                      href={selectCountry?.maps?.openStreetMaps}
                                      target="blank"
                                    >
                                      Click to see openStreetMaps
                                    </a>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          )}
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  </Box>
                </Box>

                {/* {!isExpanded ? (
                  <TriangleDownIcon
                    cursor={"pointer"}
                    onClick={() => handleExpandClick(ind)}
                  />
                ) : (
                  <TriangleUpIcon
                    cursor={"pointer"}
                    onClick={() => handleExpandClick(ind)}
                  />
                )} */}
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Country;
