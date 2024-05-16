// JSX
// ㄴ Javascript XML

import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Grid } from "@chakra-ui/react";

function App() {
  return (
    <Grid p={"40px 20px"} gap={"10px"} minH={"100vh"} templateRows={"140px auto 160px"} w={"90vw"} margin={"auto"}>
      <RouterProvider router={router} />
    </Grid>
  );
}

export default App;
