import React from "react";
import { useParams } from "react-router-dom";
import ServiceDetailPage from "./components/ServiceDetailPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";
import { findServiceRoute } from "./data/servicesCatalog";

export default function ServiceSubServicePage() {
  const { categorySlug, subServiceSlug, subChildSlug } = useParams();
  const resolved = findServiceRoute(categorySlug, subServiceSlug, subChildSlug);

  if (!resolved) {
    return <NotFoundPage />;
  }

  return <ServiceDetailPage resolved={resolved} />;
}
