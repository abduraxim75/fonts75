import { Route, Routes } from "react-router-dom"
import FontsComponent from "../components/fonts"
import FontFamilyPage from "./fontfamilypage"

const Routecontroller = () => {
    return (
        <Routes>
            <Route path="/" element={<FontsComponent />} />
            <Route path="/specimen/:familyId" element={<FontFamilyPage />} />

        </Routes>

    )
}

export default Routecontroller