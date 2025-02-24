import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnwindPage from "./pages/Unwind";
import LoopPage from "./pages/Loop";
import BorrowPage from "./pages/Borrow";
import HomePage from "./pages/Home";
import { Header } from "./Header/Header";
import Navigation from "./Header/Navigation";
import { Footer } from "./Footer/Footer";
import { BackgroundOverlay } from "./ui/BackgroundOverlay";

export const dynamic = "force-dynamic";

function App() {
  return (
    <>
      <Router>
        <Box
          sx={{
            minHeight: {
              xs: "calc(100dvh - 56px)",
              sm: "calc(100dvh - 182px)",
            },
            bgcolor: "background.default",
          }}
        >
          <BackgroundOverlay />
          <Header />
          <Box
            sx={{
              bgcolor: "background.paper",
              position: "fixed",
              width: "100%",
              top: { xs: 56, sm: 64 },
              zIndex: 40,
            }}
          >
            <Divider />
            <Navigation />
            <Divider />
          </Box>
          <Grid
            container
            spacing={1}
            pt={"158px"}
            px={0}
            direction="column"
            alignContent={"center"}
            sx={{
              minHeight: {
                xs: "calc(100dvh - 56px)",
                sm: "calc(100dvh - 182px)",
              },
              minWidth: "100dvw",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/borrow" element={<BorrowPage />} />
              <Route path="/loop" element={<LoopPage />} />
              <Route path="/unwind" element={<UnwindPage />} />
            </Routes>
          </Grid>
        </Box>
        <Box
          px={0}
          direction="column"
          alignContent={"center"}
          style={{ minWidth: "100dvw" }}
        >
          <Footer />
        </Box>
      </Router>
    </>
  );
}

export default App;