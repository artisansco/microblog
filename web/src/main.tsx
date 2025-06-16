import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import Homepage from "./routes/index.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
]);

createRoot(document.getElementById("root") as Container).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
