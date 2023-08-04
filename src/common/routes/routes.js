import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import App from "../App";
import Articles from "../../pages/Articles/Articles";
import Article from "../../pages/Article/Article";


const ROUTES = {
	articles: "/",
	article: `/:articleId`,
};


export const router = createBrowserRouter(createRoutesFromElements(
	<Route path={ROUTES.articles} element={<App />}>
		<Route index element={<Articles />} />
		<Route path={ROUTES.article} element={<Article />} />
	</Route>
));


export default ROUTES;
