import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Navigation } from "./components";
import { SITE_NAME } from "./constants";
import { Toast } from "./components/toast";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>{SITE_NAME}</Title>
          <Navigation/>
          <Suspense>{props.children}</Suspense>
          <Toast/>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
