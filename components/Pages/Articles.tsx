import React, { useState } from "react";
import { supabaseClient } from "../../lib/client";
import Dropdown from "../Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MultiSelect } from "primereact/multiselect";

export default function Articles({ setCurrentPage }: any) {
  const user = supabaseClient.auth.user();
  const [selectedProducts7, setSelectedProducts7] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sun Pharma Global FZE",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "https://bite.example.com/",
    },
    {
      id: 2,
      name: "MEGASOL COSMETIC GMBH",
      researchParadigm: "Quantitative",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Simple Random",
      link: "https://bait.example.com/",
    },
    {
      id: 3,
      name: "Rebel Distributors Corp",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Convenience",
      link: "https://bikes.example.com/?agreement=bell#believe https://example.com/?account=advice",
    },
    {
      id: 4,
      name: "Contract Pharmacy Services-PA",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://example.net/",
    },
    {
      id: 5,
      name: "ALK-Abello, Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Stratified",
      link: "http://example.com/",
    },
    {
      id: 6,
      name: "AvKARE, Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 7,
      name: "REMEDYREPACK INC.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Simple Random",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 8,
      name: "AvKARE, Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Correlational",
      samplingDesign: "Other",
      samplingTechnique: "Purposive",
      link: "https://bite.example.com/",
    },
    {
      id: 9,
      name: "General Injectables & Vaccines, Inc",
      researchParadigm: "Quantitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Simple Random",
      link: "http://example.org/army",
    },
    {
      id: 10,
      name: "Northstar Rx LLC",
      researchParadigm: null,
      researchDesign: null,
      samplingDesign: null,
      samplingTechnique: null,
      link: null,
    },
    {
      id: 11,
      name: "Bristol-Myers Squibb Company",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Other",
      samplingTechnique: "Stratified",
      link: "https://bite.example.com/",
    },
    {
      id: 12,
      name: "A-S Medication Solutions LLC",
      researchParadigm: "Qualitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Purposive",
      link: "https://bite.example.com/",
    },
    {
      id: 13,
      name: "GAVIS Pharmaceuticals, LLC",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Convenience",
      link: "http://example.org/army",
    },
    {
      id: 14,
      name: "Physician Therapeutics LLC",
      researchParadigm: "Quantitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Convenience",
      link: "http://example.net/",
    },
    {
      id: 15,
      name: "Llorens Pharmaceutical International Division",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "https://bait.example.com/",
    },
    {
      id: 16,
      name: "Rocco's Old School",
      researchParadigm: "Qualitative",
      researchDesign: "Experimental",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Other",
      link: "https://bait.example.com/",
    },
    {
      id: 17,
      name: "GlaxoSmithKline Biologicals SA",
      researchParadigm: "Qualitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Snowball",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 18,
      name: "Johnson & Johnson Consumer Products Company, Division of Johnson & Johnson Consumer Companies, Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Correlational",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "http://example.com/",
    },
    {
      id: 19,
      name: "Lake Erie Medical DBA Quality Care Products LLC",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Convenience",
      link: "https://bite.example.com/",
    },
    {
      id: 20,
      name: "Wyeth Pharmaceuticals Inc., a subsidiary of Pfizer Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Convenience",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 21,
      name: "REMEDYREPACK INC.",
      researchParadigm: "Quantitative",
      researchDesign: "Other",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "http://example.com/ball.php?beds=bee",
    },
    {
      id: 22,
      name: "Avon Products, Inc",
      researchParadigm: "Mixed Methods",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://example.com/",
    },
    {
      id: 23,
      name: "Major Pharmaceuticals",
      researchParadigm: "Mixed Methods",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 24,
      name: "Teva Pharmaceuticals USA Inc",
      researchParadigm: "Qualitative",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 25,
      name: "Greenstone LLC",
      researchParadigm: "Mixed Methods",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "http://example.com/",
    },
    {
      id: 26,
      name: "Barr Laboratories Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Other",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 27,
      name: "Avon Products, Inc.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Experimental",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Cluster",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 28,
      name: "Mylan Pharmaceuticals Inc.",
      researchParadigm: null,
      researchDesign: null,
      samplingDesign: null,
      samplingTechnique: null,
      link: null,
    },
    {
      id: 29,
      name: "Nelco Laboratories, Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Cluster",
      link: "http://example.com/ball.php?beds=bee",
    },
    {
      id: 30,
      name: "CARDINAL HEALTH, INC.",
      researchParadigm: "Quantitative",
      researchDesign: "Correlational",
      samplingDesign: "Probability",
      samplingTechnique: "Stratified",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 31,
      name: "STAT RX USA LLC",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "https://bait.example.com/",
    },
    {
      id: 32,
      name: "ALK-Abello, Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Correlational",
      samplingDesign: "Other",
      samplingTechnique: "Purposive",
      link: "https://bite.example.com/",
    },
    {
      id: 33,
      name: "Ventura Corporation LTD",
      researchParadigm: "Mixed Methods",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Simple Random",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 34,
      name: "Apotheca Company",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Cluster",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 35,
      name: "Blistex Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Correlational",
      samplingDesign: "Other",
      samplingTechnique: "Convenience",
      link: "https://bait.example.com/",
    },
    {
      id: 36,
      name: "Amerisource Bergen",
      researchParadigm: "Qualitative",
      researchDesign: "Experimental",
      samplingDesign: "Other",
      samplingTechnique: "Snowball",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 37,
      name: "A P J Laboratories Limited",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Stratified",
      link: "https://bite.example.com/",
    },
    {
      id: 38,
      name: "NATURE REPUBLIC CO., LTD.",
      researchParadigm: "Qualitative",
      researchDesign: "Other",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://example.org/army",
    },
    {
      id: 39,
      name: "Bausch & Lomb Incorporated",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Convenience",
      link: "https://bikes.example.com/?agreement=bell#believe https://example.com/?account=advice",
    },
    {
      id: 40,
      name: "Nelco Laboratories, Inc.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Correlational",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "https://bait.example.com/",
    },
    {
      id: 41,
      name: "Mylan Institutional LLC",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Other",
      samplingTechnique: "Snowball",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 42,
      name: "PHARMAZEUTISCHE FABRIK DR. RECKEWEG & CO",
      researchParadigm: "Quantitative",
      researchDesign: "Correlational",
      samplingDesign: "Other",
      samplingTechnique: "Purposive",
      link: "http://example.org/army",
    },
    {
      id: 43,
      name: "American Health Packaging",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "https://bite.example.com/",
    },
    {
      id: 44,
      name: "Physicians Total Care, Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Simple Random",
      link: "http://example.net/",
    },
    {
      id: 45,
      name: "Cosmetic Specialty labs, Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Stratified",
      link: "http://example.com/",
    },
    {
      id: 46,
      name: "PD-Rx Pharmaceuticals, Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Experimental",
      samplingDesign: "Other",
      samplingTechnique: "Convenience",
      link: "https://bite.example.com/",
    },
    {
      id: 47,
      name: "Cantrell Drug Company",
      researchParadigm: "Mixed Methods",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "https://bikes.example.com/?agreement=bell#believe https://example.com/?account=advice",
    },
    {
      id: 48,
      name: "Aphena Pharma Solutions - Tennessee, LLC",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Purposive",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 49,
      name: "J. A. Cosmetics U.S. INC",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://example.org/army",
    },
    {
      id: 50,
      name: "Natural Health Supply",
      researchParadigm: "Mixed Methods",
      researchDesign: "Experimental",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Stratified",
      link: "http://example.org/army",
    },
    {
      id: 51,
      name: "SMASHBOX BEAUTY COSMETICS, INC",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Other",
      samplingTechnique: "Purposive",
      link: "http://example.net/",
    },
    {
      id: 52,
      name: "General Injectables & Vaccines, Inc",
      researchParadigm: "Qualitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Stratified",
      link: "https://bait.example.com/",
    },
    {
      id: 53,
      name: "Natural Health Supply",
      researchParadigm: "Qualitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Purposive",
      link: "https://bite.example.com/",
    },
    {
      id: 54,
      name: "Conopco Inc. d/b/a Unilever",
      researchParadigm: "Qualitative",
      researchDesign: "Correlational",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Stratified",
      link: "http://example.org/army",
    },
    {
      id: 55,
      name: "Teva Pharmaceuticals USA Inc",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 56,
      name: "H E B",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Other",
      samplingTechnique: "Snowball",
      link: "http://example.org/army",
    },
    {
      id: 57,
      name: "NATURE REPUBLIC CO., LTD.",
      researchParadigm: "Quantitative",
      researchDesign: "Other",
      samplingDesign: "Other",
      samplingTechnique: "Simple Random",
      link: "https://bait.example.com/",
    },
    {
      id: 58,
      name: "Ventura International, LTD",
      researchParadigm: "Quantitative",
      researchDesign: "Survey",
      samplingDesign: "Other",
      samplingTechnique: "Convenience",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 59,
      name: "Neutrogena Corporation",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Other",
      samplingTechnique: "Cluster",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 60,
      name: "Shopko Stores Operating Co., LLC",
      researchParadigm: "Qualitative",
      researchDesign: "Review",
      samplingDesign: "Other",
      samplingTechnique: "Convenience",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 61,
      name: "Your Military Exchange",
      researchParadigm: "Quantitative",
      researchDesign: "Correlational",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Simple Random",
      link: "http://example.org/army",
    },
    {
      id: 62,
      name: "Hospira, Inc",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "https://bite.example.com/",
    },
    {
      id: 63,
      name: "REMEDYREPACK INC.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Correlational",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Other",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 64,
      name: "Physicians Total Care, Inc.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Correlational",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://example.org/army",
    },
    {
      id: 65,
      name: "Blenheim Pharmacal, Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Cluster",
      link: "https://bite.example.com/",
    },
    {
      id: 66,
      name: "Western Family Foods Inc",
      researchParadigm: "Qualitative",
      researchDesign: "Review",
      samplingDesign: "Other",
      samplingTechnique: "Snowball",
      link: "http://example.com/",
    },
    {
      id: 67,
      name: "McKesson",
      researchParadigm: "Qualitative",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://example.net/",
    },
    {
      id: 68,
      name: "Sagent Pharmaceuticals",
      researchParadigm: "Qualitative",
      researchDesign: "Experimental",
      samplingDesign: "Other",
      samplingTechnique: "Purposive",
      link: "https://bait.example.com/",
    },
    {
      id: 69,
      name: "Geiss, Destin & Dunn, Inc",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Stratified",
      link: "http://example.com/",
    },
    {
      id: 70,
      name: "Native Remedies, LLC",
      researchParadigm: null,
      researchDesign: null,
      samplingDesign: null,
      samplingTechnique: null,
      link: null,
    },
    {
      id: 71,
      name: "Enovachem Manufacturing",
      researchParadigm: "Quantitative",
      researchDesign: "Other",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Simple Random",
      link: "https://bait.example.com/",
    },
    {
      id: 72,
      name: "Publix Super Markets Inc",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Simple Random",
      link: "https://bite.example.com/",
    },
    {
      id: 73,
      name: "Paddock Laboratories, LLC",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Snowball",
      link: "http://example.com/ball.php?beds=bee",
    },
    {
      id: 74,
      name: "Uriel Pharmacy Inc.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Snowball",
      link: "http://example.com/ball.php?beds=bee",
    },
    {
      id: 75,
      name: "Kmart Corporation",
      researchParadigm: "Mixed Methods",
      researchDesign: "Experimental",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Snowball",
      link: "https://bikes.example.com/?agreement=bell#believe https://example.com/?account=advice",
    },
    {
      id: 76,
      name: "St Marys Medical Park Pharmacy",
      researchParadigm: "Qualitative",
      researchDesign: "Correlational",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "https://bikes.example.com/?agreement=bell#believe https://example.com/?account=advice",
    },
    {
      id: 77,
      name: "Frabel S.A de C.V.",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "http://example.com/",
    },
    {
      id: 78,
      name: "The Procter & Gamble Manufacturing Company",
      researchParadigm: "Qualitative",
      researchDesign: "Experimental",
      samplingDesign: "Other",
      samplingTechnique: "Stratified",
      link: "http://example.net/",
    },
    {
      id: 79,
      name: "FOCUS Laboratories, Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Purposive",
      link: "https://bait.example.com/",
    },
    {
      id: 80,
      name: "Amneal Pharmaceuticals, LLC",
      researchParadigm: "Quantitative",
      researchDesign: "Correlational",
      samplingDesign: "Probability",
      samplingTechnique: "Snowball",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 81,
      name: "Dr. Reddy's Laboratories Limited",
      researchParadigm: null,
      researchDesign: null,
      samplingDesign: null,
      samplingTechnique: null,
      link: null,
    },
    {
      id: 82,
      name: "REMEDYREPACK INC.",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "http://example.org/army",
    },
    {
      id: 83,
      name: "Zhejiang Changdi Medical Co., Ltd.",
      researchParadigm: null,
      researchDesign: null,
      samplingDesign: null,
      samplingTechnique: null,
      link: null,
    },
    {
      id: 84,
      name: "AMOREPACIFIC",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Snowball",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 85,
      name: "Fenwal, Inc.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "http://example.net/",
    },
    {
      id: 86,
      name: "Prodigy Health Supplier",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Other",
      link: "https://bait.example.com/",
    },
    {
      id: 87,
      name: "AR Medicom Inc",
      researchParadigm: "Qualitative",
      researchDesign: "Review",
      samplingDesign: "Probability",
      samplingTechnique: "Cluster",
      link: "http://www.example.com/beds/attraction.htm",
    },
    {
      id: 88,
      name: "HHS/Program Support Center/Supply Service Center",
      researchParadigm: "Mixed Methods",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "https://bite.example.com/",
    },
    {
      id: 89,
      name: "Dukal Corporation",
      researchParadigm: null,
      researchDesign: null,
      samplingDesign: null,
      samplingTechnique: null,
      link: null,
    },
    {
      id: 90,
      name: "Rubbermaid Commercial Products",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Purposive",
      link: "http://example.org/army",
    },
    {
      id: 91,
      name: "REMEDYREPACK INC.",
      researchParadigm: "Qualitative",
      researchDesign: "Survey",
      samplingDesign: "Probability",
      samplingTechnique: "Stratified",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 92,
      name: "ALK-Abello, Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Correlational",
      samplingDesign: "Other",
      samplingTechnique: "Purposive",
      link: "https://bikes.example.com/?agreement=bell#believe https://example.com/?account=advice",
    },
    {
      id: 93,
      name: "Altaire Pharmaceuticals Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Convenience",
      link: "https://bite.example.com/",
    },
    {
      id: 94,
      name: "NorthStar Rx LLC",
      researchParadigm: "Qualitative",
      researchDesign: "Correlational",
      samplingDesign: "Probability",
      samplingTechnique: "Other",
      link: "https://bait.example.com/",
    },
    {
      id: 95,
      name: "Wyeth Pharmaceuticals Inc., a subsidiary of Pfizer Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Stratified",
      link: "http://aunt.example.com/basket.php",
    },
    {
      id: 96,
      name: "Roxane Laboratories, Inc.",
      researchParadigm: "Qualitative",
      researchDesign: "Experimental",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Other",
      link: "http://example.org/army",
    },
    {
      id: 97,
      name: "Pure Source",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Cluster",
      link: "https://bikes.example.com/?agreement=bell#believe https://example.com/?account=advice",
    },
    {
      id: 98,
      name: "SJ Creations, Inc.",
      researchParadigm: "Mixed Methods",
      researchDesign: "Survey",
      samplingDesign: "Other",
      samplingTechnique: "Other",
      link: "https://bite.example.com/",
    },
    {
      id: 99,
      name: "Zep Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Experimental",
      samplingDesign: "Probability",
      samplingTechnique: "Purposive",
      link: "http://example.com/",
    },
    {
      id: 100,
      name: "Zydus Pharmaceuticals (USA) Inc.",
      researchParadigm: "Quantitative",
      researchDesign: "Review",
      samplingDesign: "Non-Probability",
      samplingTechnique: "Other",
      link: "http://example.com/",
    },
  ]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center pb-8">
        <h5 className="m-0 text-2xl font-semibold">Articles</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <div className="ml-8">
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              style={{
                backgroundColor: "#2b2b2b",
                color: "white",
                padding: "10px",
                borderRadius: "20px",
                marginLeft: "10px",
              }}
            />
          </div>
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {
    return (
      <a href={rowData.link} target="_blank">
        <button
          className="font-bold text-black rounded-lg py-2 px-6 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105"
          type="button"
        >
          View Article
        </button>
      </a>
    );
  };

  const researchParadigmBodyTemplate = (rowData) => {
    let style = "";
    if (rowData.researchParadigm === "Quantitative") {
      style = "bg-orange-400/50";
    }
    if (rowData.researchParadigm === "Qualitative") {
      style = "bg-purple-400/50";
    }
    if (rowData.researchParadigm === "Mixed Methods") {
      style = "bg-blue-300/50";
    }
    return (
      <span className={`${style} px-2 p-1 rounded-lg`}>
        {rowData.researchParadigm}
      </span>
    );
  };

  return (
    <>
      <div className="absolute right-4 top-4">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full flex h-max-h-6xl bg-darkSlateGray text-white">
        <div className="flex justify-center mt-4 w-full">
          <div className="h-90/100 p-24 rounded-lg datatable-doc-demo">
            <DataTable
              selection={selectedProducts7}
              onSelectionChange={(e) => setSelectedProducts7(e.value)}
              scrollable
              scrollHeight="flex"
              value={products}
              showGridlines
              header={header}
              filters={filters}
              filterDisplay="menu"
              responsiveLayout="scroll"
              style={{ width: "100rem", maxHeight: "70rem" }}
            >
              <Column
                selectionMode="multiple"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  borderBottomWidth: "2px",
                  borderColor: "#2a3033",
                }}
              ></Column>
              <Column
                header="Name"
                sortable
                field="name"
                style={{
                  minWidth: "14rem",
                  borderBottomWidth: "2px",
                  borderColor: "#2a3033",
                  padding: "1em",
                }}
              />
              <Column
                header="Research Paradigm"
                style={{
                  minWidth: "14rem",
                  borderBottomWidth: "2px",
                  borderColor: "#2a3033",
                  padding: "1em",
                }}
                sortable
                field="researchParadigm"
                body={researchParadigmBodyTemplate}
              />
              <Column
                header="Research Design"
                style={{
                  minWidth: "14rem",
                  borderBottomWidth: "2px",
                  borderColor: "#2a3033",
                  padding: "1em",
                }}
                sortable
                field="researchDesign"
              />
              <Column
                header="Sampling Design"
                style={{
                  minWidth: "14rem",
                  borderBottomWidth: "2px",
                  borderColor: "#2a3033",
                  padding: "1em",
                }}
                sortable
                field="samplingDesign"
              />
              <Column
                header="Sampling Technique"
                style={{
                  minWidth: "14rem",
                  borderBottomWidth: "2px",
                  borderColor: "#2a3033",
                  padding: "1em",
                }}
                sortable
                field="samplingTechnique"
              />
              <Column
                header="Link"
                style={{
                  minWidth: "14rem",
                  borderBottomWidth: "2px",
                  borderColor: "#2a3033",
                  padding: "1em",
                }}
                field="link"
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
