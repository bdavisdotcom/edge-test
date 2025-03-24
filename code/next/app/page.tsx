import { H1 } from "@/components/h1";
import { H2 } from "@/components/h2";
import { H3 } from "@/components/h3";

export default function Page() {
    return (
        <div className="p-4 space-y-4">
            <H1>Sample Task Application</H1>
            <p>This is a very simple (and incomplete) full-stack sample application using Docker, a NextJS front-end, a NodeJS API server, and a Postgres database</p>
            <p>This was created for demonstration purposes</p>
            <p>You can do the following:</p>
            <ul className="list-disc mx-4">
                <li>Register an account</li>
                <li>Login</li>
                <li>Manage Tasks</li>
            </ul>
            <H2>Tech Stack</H2>
            <H3>Front End</H3>
            <ul className="list-disc mx-4 mb-4">
                <li>NextJS</li>
                <li>Typescript</li>
                <li>React hook form</li>
                <li>yup</li>
                <li>React AG Grid</li>
                <li>Layout is responsive, but the AG Grid is not</li>
            </ul>
            <H3>Back End</H3>
            <ul className="list-disc mx-4 mb-4">
                <li>NodeJS</li>
                <li>Javascript</li>
                <li>Postgres DB</li>
                <li>Express</li>
                <li>express-jwt auth tokens and middleware</li>
                <li>ley DB migrations</li>
                <li>Open API schema validation</li>
            </ul>            
        </div>
    );
}