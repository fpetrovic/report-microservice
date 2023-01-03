import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home/Home";
import ReportTemplateIndex, {
    loader as reportTemplatesLoader
} from "../components/report/reportTemplate/ReportTemplateIndex";
import ReportTemplate, {loader as reportTemplateLoader} from "../components/report/reportTemplate/ReportTemplate";
import ReportIndex, {loader as reportsLoader} from "../components/report/report/ReportIndex";
import Report, {loader as reportLoader} from "../components/report/report/Report";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        loader: Home
    },
    {
        path: "/reportTemplates",
        element: <ReportTemplateIndex />,
        loader: reportTemplatesLoader
    },
    {
        path: "/reportTemplates/:reportTemplateId",
        element: <ReportTemplate />,
        loader: reportTemplateLoader,
    },
    {
        path: "/reportTemplates/new",
        element: <ReportTemplate />,
        loader: reportTemplateLoader,
    },
    {
        path: "/reports",
        element: <ReportIndex />,
        loader: reportsLoader
    },
    {
        path: "/reports/:reportId",
        element: <Report />,
        loader: reportLoader,
    },
    {
        path: "/reports/new",
        element: <Report />,
        loader: reportLoader,
    },
]);

export default router
