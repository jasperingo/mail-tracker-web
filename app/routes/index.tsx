import { json, type LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect } from 'react';
import { IoMailUnread } from "react-icons/io5";
import { toast } from 'react-toastify';
import { InputComponent } from "~/components/forms/input.component";
import { SubmitButtonComponent } from '~/components/forms/submit-button.component';
import { H3Component } from '~/components/headers/h3.component';
import { HomeNavItemComponent } from "~/components/list-items/home-nav-item.component";
import { HomeStepsItem } from '~/components/list-items/home-steps-item.component';
import { TemplateItemComponent } from '~/components/list-items/template-item.component';
import { CenterBlurLoaderComponent } from "~/components/loaders/center-blur-loader.component";
import { serverSession } from "~/server/session.server";

type LoaderData = {
  errors: {
    signIn: string;
  };
};

type ActionData = {
  email?: string;
  password?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  const data: LoaderData = { 
    errors: {
      signIn: session.get('signInError'),
    }
  };

  return json(data, {
    headers: await serverSession.commitSession(session),
  });
}

export default function Index() {
  const data = useActionData<ActionData>();
  
  const transition = useTransition();

  const { errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
   if (transition.state === 'idle' && errors.signIn !== undefined) { 
      toast.error(errors.signIn);
    }
  }, [errors.signIn, transition.state]);

  return (
    <div>
      <CenterBlurLoaderComponent />

      <header className="border-b py-4">
        <div className="container flex items-center gap-x-2">
          <IoMailUnread className="text-3xl text-orange-600 lg:text-4xl" />
          <h1 className="font-bold text-orange-600 text-xl lg:text-2xl">Mail tracker</h1>
          <nav className="flex-grow flex justify-end sr-only md:not-sr-only">
            <ul className="flex w-fit gap-x-4">
              <HomeNavItemComponent text="Sign in" to="#sign-in" />
              <HomeNavItemComponent text="Steps" to="#steps" />
              <HomeNavItemComponent text="Templates" to="#templates" />
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">

          <section className="py-4 lg:py-12 lg:flex lg:gap-x-8">
            <div className="py-8">
              <h2 className="text-orange-600 text-4xl lg:text-6xl">An application for templating, sending, tracking and signing letters.</h2>
              <div className="py-4 text-gray-600 font-bold">For Federal University of Technology Owerri.</div>
            </div>
            
            <Form
              id="sign-in"
              method="post" 
              className="auth-form" 
              action="sign-in"
            >
              <fieldset disabled={transition.state !== 'idle'}>

                <InputComponent id="email-input" label="Email" name="email" type="email" value={data?.email} />

                <InputComponent id="password-input" label="Password" name="password" type="password" />

                <SubmitButtonComponent text="Sign in" />

              </fieldset>
            </Form>
          </section>

          <section className="py-8 lg:flex lg:gap-x-8">

            <div>
              <img 
                src="/images/typewriter.jpg" 
                alt="A typewriter" 
                className="w-full h-96 lg:w-[80em] shadow shadow-color-primary rounded-lg" 
              />
            </div>

           <div className="py-4 lg:w-[80rem]" id="steps">
            <H3Component text="How it works" />
            <ul>
                <HomeStepsItem step={1} text="Sign in" />
                <HomeStepsItem step={2} text="Find a template" />
                <HomeStepsItem step={3} text="Add the letter recipients" />
                <HomeStepsItem step={4} text="Add the letter values" />
                <HomeStepsItem step={5} text="Send letter" />
                <HomeStepsItem step={5} text="Recipients receive and sign letter sequentially" />
              </ul>
           </div>
            
          </section>

          <section className="py-8" id="templates">

            <H3Component text="Templates" />

            <ul className="lg:flex lg:flex-wrap lg:gap-x-8">
              <TemplateItemComponent text="Missing result" />
              <TemplateItemComponent text="Missing practical" />
              <TemplateItemComponent text="Missing practical v2" />
            </ul>

          </section>

        </div>
      </main>

      <footer className="bg-orange-400 text-center p-4">
        Enhancing processes with technology is the goal.
      </footer>
    </div>
  );
}
