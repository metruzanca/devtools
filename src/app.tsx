import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { A } from "./components";
import { SITE_NAME } from "./constants";
import { Toast } from "./components/toast";

const Navigation = () => (
  <nav class="px-4 w-full h-8 flex justify-between text-xl">
    <A href="/">Index</A>
    <span>
      <A href="/colors">Colors</A>
    </span>
  </nav>
)


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
