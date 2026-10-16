import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import QuestCategories from "./components/quests/QuestCategories.jsx";
import LocalQuests from "./components/quests/LocalQuests.jsx";
import UnpopularQuests from "./components/quests/UnpopularQuests.jsx";
import ShortQuests from "./components/quests/ShortQuests.jsx";
import LongQuests from "./components/quests/LongQuests.jsx";
import UrgentQuests from "./components/quests/UrgentQuests.jsx";

<Route element={<ProtectedRoute />}>
    <Route element={<Layout />}>
        <Route path="/volunteer/tasks" element={<QuestCategories />} />
        <Route path="/volunteer/tasks/local" element={<LocalQuests />} />
        <Route path="/volunteer/tasks/unpopular" element={<UnpopularQuests />} />
        <Route path="/volunteer/tasks/short" element={<ShortQuests />} />
        <Route path="/volunteer/tasks/long" element={<LongQuests />} />
        <Route path="/volunteer/tasks/urgent" element={<UrgentQuests />} />
    </Route>
</Route>
