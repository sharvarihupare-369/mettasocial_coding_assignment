import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Error from "./Error";

const Country = ({ countryData }) => {
  // const [expanded, setExpanded] = React.useState(false);

 

  const [expandedStates, setExpandedStates] = useState(
    new Array(countryData?.length).fill(false)
  );

  if(!Array.isArray(countryData)){
    return <Error/>
  }

  const handleExpandClick = (index) => {
    const newExpanded = [...expandedStates];
    newExpanded[index] = !newExpanded[index];
    setExpandedStates(newExpanded);
  };

  return (
    <Box w="80%" m="30px auto">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {countryData?.map((country, ind) => {
          let isExpanded = expandedStates[ind];
          return (
            <Box
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
                  <Heading size="md" as="h4">
                    Capital : {country?.capital[0]}
                  </Heading>
                  {isExpanded && (
                    <>
                      <Heading size="md" as="h4">
                        Continets:{country?.continents[0]}
                      </Heading>
                      <Heading size="md" as="h4">
                        Population:{country?.population}
                      </Heading>
                      <Heading size="md" as="h4">
                        Region:{country?.region}
                      </Heading>
                    </>
                  )}
                </Box>

                {!isExpanded ? (
                  <TriangleDownIcon
                    cursor={"pointer"}
                    onClick={() => handleExpandClick(ind)}
                  />
                ) : (
                  <TriangleUpIcon
                    cursor={"pointer"}
                    onClick={() => handleExpandClick(ind)}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Country;
