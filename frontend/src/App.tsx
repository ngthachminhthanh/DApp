import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, GuestRoute } from "./routes";
import Home from "./pages/home";
import Profile from "./pages/profile";
import CreateToken from "./pages/create-token";
import TokenList from "./pages/token-list";
import NFTCollection from "./pages/nft-collection";
import NFTList from "./pages/nft-list";
import { Toaster } from "@/components/ui";
import { useAuthContext } from "@/hooks/useAuthContext";

function App() {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      <Routes>
        <Route element={<GuestRoute isAllowed={!isLoggedIn} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/create-token" element={<CreateToken />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/token-list" element={<TokenList />} />
          <Route path="/nft-collection" element={<NFTCollection />} />
          <Route path="/nft-list" element={<NFTList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" duration={3000} richColors />
    </>
  );
}

export default App;
