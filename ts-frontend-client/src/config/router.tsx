import {createBrowserRouter} from "react-router-dom";
import Home from "../Common/Page/Home";
import ReportTemplateIndex, {
    loader as reportTemplatesLoader
} from "../ReportTemplate/Component/ReportTemplateIndex";
import ReportTemplate, {loader as reportTemplateLoader} from "../ReportTemplate/Component/ReportTemplate";
import ReportIndex, {loader as reportsLoader} from "../Report/Component//ReportIndex";
import Report, {loader as reportLoader} from "../Report/Component/Report";
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
