import React from "react";
import OurCompany from "@/pages/guest/About/OurCompany";
import Team from "@/pages/guest/About/Team";
import Blog from "@/pages/guest/Blog/Blog";
import BlogDetail from "@/pages/guest/Blog/BlogDetail";
import Careers from "@/pages/guest/Career/Careers";
import CalculatorPage from "@/pages/guest/Calculator/Calculator";
import ContactUs from "@/pages/guest/Contact/ContactUs";
import Home from "@/pages/guest/Home/Home";
import ProjectsMap from "@/pages/guest/Projects/ProjectsMap";
import ServicesPage from "@/pages/guest/Services/Services";
import BusinessConsulting from "@/pages/guest/Services/business-investment-advisory/BusinessConsulting";
import BusinessDevelopment from "@/pages/guest/Services/business-investment-advisory/business-development/BusinessDevelopment";
import BusinessStructuring from "@/pages/guest/Services/business-investment-advisory/business-structuring/BusinessStructuring";
import CompanyFormation from "@/pages/guest/Services/business-investment-advisory/company-formation/CompanyFormation";
import Freezone from "@/pages/guest/Services/business-investment-advisory/company-formation/free-zone/Freezone";
import Mainland from "@/pages/guest/Services/business-investment-advisory/company-formation/mainland/Mainland";
import Offshore from "@/pages/guest/Services/business-investment-advisory/company-formation/Offshore/Offshore";
import InvestmentAdvisory from "@/pages/guest/Services/business-investment-advisory/investment-advisory/InvestmentAdvisory";
import InvestorProjects from "@/pages/guest/Services/business-investment-advisory/investor-projects/InvestorProjects";
import MarketEntryStrategy from "@/pages/guest/Services/business-investment-advisory/market-entry-strategy/MarketEntryStrategy";
import BusinessSolutionsPage from "@/pages/guest/Services/business-solutions/BusinessSolutions";
import BrandingPRReputationManagement from "@/pages/guest/Services/business-solutions/branding-pr-and-reputation-management/BrandingPRReputationManagement";
import ContentCreationVideographyPhotography from "@/pages/guest/Services/business-solutions/content-creation-videography-and-photography/ContentCreationVideographyPhotography";
import DigitalMarketingPerformanceAdvertising from "@/pages/guest/Services/business-solutions/digital-marketing-and-performance-advertising/DigitalMarketingPerformanceAdvertising";
import ITInfrastructureNetworkSecurityCloud from "@/pages/guest/Services/business-solutions/it-infrastructure-network-security-and-cloud/ITInfrastructureNetworkSecurityCloud";
import OfficeSpaceAdvisoryInteriorFitOut from "@/pages/guest/Services/business-solutions/office-space-advisory-and-interior-fit-out/OfficeSpaceAdvisoryInteriorFitOut";
import SocialMediaContentProduction from "@/pages/guest/Services/business-solutions/social-media-content-production/SocialMediaContentProduction";
import WebsiteDesignDevelopment from "@/pages/guest/Services/business-solutions/website-design-and-development/WebsiteDesignDevelopment";
import CorporateAdvisoryPage from "@/pages/guest/Services/corporate-advisory/CorporateAdvisory";
import ComplianceGovernance from "@/pages/guest/Services/corporate-advisory/compliance-governance/ComplianceGovernance";
import Insaurance from "@/pages/guest/Services/corporate-advisory/insaurance/Insaurance";
import Corporate from "@/pages/guest/Services/corporate-advisory/insaurance/corporate/Corporate";
import Health from "@/pages/guest/Services/corporate-advisory/insaurance/health/Health";
import PropertyAndRishCoverage from "@/pages/guest/Services/corporate-advisory/insaurance/property-and-risk-coverage/PropertyAndRishCoverage";
import LegalServices from "@/pages/guest/Services/corporate-advisory/legal-services/LegalServices";
import TaxFinancialAdvisory from "@/pages/guest/Services/corporate-advisory/tax-financial-advisory/TaxFinancialAdvisory";
import RealEstate from "@/pages/guest/Services/real-estate-services/RealEstate";
import LeasingAdvisory from "@/pages/guest/Services/real-estate-services/leasing-advisory/LeasingAdvisory";
import PortfolioManagement from "@/pages/guest/Services/real-estate-services/portfolio-management/PortfolioManagement";
import PropertyAcquisition from "@/pages/guest/Services/real-estate-services/property-acquisition/PropertyAcquisition";
import ServiceSubServicePage from "@/pages/guest/Services/ServiceSubServicePage";
import VisaImmigrationPage from "@/pages/guest/Services/visa-immigration-services/VisaImmigration";
import EmploymentVisa from "@/pages/guest/Services/visa-immigration-services/employment-visa/EmploymentVisa";
import FamilyResidency from "@/pages/guest/Services/visa-immigration-services/family-residency/FamilyResidency";
import InvestorVisa from "@/pages/guest/Services/visa-immigration-services/investor-visa/InvestorVisa";

const guestRoutes = {
  "/": Home,
  "/projects": ProjectsMap,
  "/team": Team,
  "/careers": Careers,
  "/calculator": CalculatorPage,
  "/business-consulting": BusinessConsulting,
  "/business-development": BusinessDevelopment,
  "/investor-projects": InvestorProjects,
  "/company-formation": CompanyFormation,
  "/mainland": Mainland,
  "/freezone": Freezone,
  "/offshore": Offshore,
  "/real-estate": RealEstate,
  "/business-solutions": BusinessSolutionsPage,
  "/corporate-advisory": CorporateAdvisoryPage,
  "/visa-immigration": VisaImmigrationPage,
  "/blog": Blog,
  "/blog/:slug": BlogDetail,
  "/our-company": OurCompany,
  "/services": ServicesPage,
  "/services/business-investment-advisory/business-consulting-and-development":
    BusinessStructuring,
  "/services/business-investment-advisory/company-formation":
    CompanyFormation,
  "/services/business-investment-advisory/company-formation/mainland":
    Mainland,
  "/services/business-investment-advisory/company-formation/free-zone":
    Freezone,
  "/services/business-investment-advisory/company-formation/offshore":
    Offshore,
  "/services/business-investment-advisory/investor-advisory-and-structured-deals":
    InvestmentAdvisory,
  "/services/business-investment-advisory/market-entry-strategy":
    MarketEntryStrategy,
  "/services/business-solutions/office-space-advisory-and-interior-fit-out":
    OfficeSpaceAdvisoryInteriorFitOut,
  "/services/business-solutions/it-infrastructure-network-security-and-cloud":
    ITInfrastructureNetworkSecurityCloud,
  "/services/business-solutions/website-design-and-development":
    WebsiteDesignDevelopment,
  "/services/business-solutions/digital-marketing-and-performance-advertising":
    DigitalMarketingPerformanceAdvertising,
  "/services/business-solutions/branding-pr-and-reputation-management":
    BrandingPRReputationManagement,
  "/services/business-solutions/content-creation-videography-and-photography":
    ContentCreationVideographyPhotography,
  "/services/business-solutions/social-media-content-production":
    SocialMediaContentProduction,
  "/services/corporate-advisory/corporate-structuring-and-compliance":
    ComplianceGovernance,
  "/services/corporate-advisory/legal-documentation-and-contracts":
    LegalServices,
  "/services/corporate-advisory/tax-registration-and-compliance":
    TaxFinancialAdvisory,
  "/services/corporate-advisory/insurance": Insaurance,
  "/services/corporate-advisory/insurance/corporate":
    Corporate,
  "/services/corporate-advisory/insurance/health": Health,
  "/services/corporate-advisory/insurance/property-and-risk-coverage":
    PropertyAndRishCoverage,
  "/services/real-estate-services/off-plan-and-secondary-properties":
    PropertyAcquisition,
  "/services/real-estate-services/property-management-and-leasing":
    LeasingAdvisory,
  "/services/real-estate-services/asset-management":
    PortfolioManagement,
  "/services/visa-immigration-services/investor-and-partner-visas":
    InvestorVisa,
  "/services/visa-immigration-services/employment-visas":
    EmploymentVisa,
  "/services/visa-immigration-services/family-sponsorship":
    FamilyResidency,
  "/services/:categorySlug/:subServiceSlug":
    ServiceSubServicePage,
  "/services/:categorySlug/:subServiceSlug/:subChildSlug":
    ServiceSubServicePage,
  "/contact-us": ContactUs,
};

export default guestRoutes;
