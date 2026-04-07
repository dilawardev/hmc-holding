import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/errors/NotFoundPage";
import { ProjectsMapLockProvider } from "@/hooks/useProjectsMapLock";
import routes from "./routes";

function App() {
  const generateRoutes = (prefix, routeGroup) =>
    Object.entries(routeGroup).map(([path, Component]) => (
      <Route key={`${prefix}${path}`} path={`${prefix}${path}`} element={<Component />} />
    ));
  const renderRouteGroup = ({ prefix = "", routes: routeGroup, layout: LayoutComponent }, index) => {
    const groupRoutes = generateRoutes(prefix, routeGroup);

    if (!LayoutComponent) {
      return groupRoutes;
    }

    return (
      <Route key={`group-${prefix || index}`} element={<LayoutComponent />}>
        {groupRoutes}
      </Route>
    );
  };
  return (
    <Router>
      <ProjectsMapLockProvider>
        <Suspense fallback={null}>
          <Routes>
            {routes.map(renderRouteGroup)}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ProjectsMapLockProvider>
    </Router>
  );
}

export default App;
