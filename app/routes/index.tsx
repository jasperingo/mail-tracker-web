import { type ActionFunction } from '@remix-run/node';
import { Form } from "@remix-run/react";
import { IoMailUnread } from "react-icons/io5";
import { InputComponent } from "~/components/forms/input.component";
import { SubmitButtonComponent } from '~/components/forms/submit-button.component';
import { H3Component } from '~/components/headers/h3.component';
import { HomeNavItemComponent } from "~/components/list-items/home-nav-item.component";
import { HomeStepsItem } from '~/components/list-items/home-steps-item.component';
import { TemplateItemComponent } from '~/components/list-items/template-item.component';

export const action: ActionFunction = async ({ request }) => {}

export default function Index() {
  return (
    <div>
      <header className="border-b py-4">
        <div className="container flex items-center gap-x-2">
          <IoMailUnread className="text-3xl text-orange-600 lg:text-4xl" />
          <h1 className="font-bold text-orange-600 text-xl lg:text-2xl">Mail tracker</h1>
          <nav className="flex-grow flex justify-end sr-only md:not-sr-only">
            <ul className="flex w-fit gap-x-4">
              <HomeNavItemComponent text="Sign in" to="#sign-in" />
              <HomeNavItemComponent text="Sign up" to="#sign-up" />
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
            </div>
            
            <Form
              id="sign-in"
              method="post" 
              className="auth-form" 
              action=""
            >
              <fieldset>

                <InputComponent id="sign-in-email-input" label="Email" name="email" type="email" />

                <InputComponent id="sign-in-password-input" label="Password" name="password" type="password" />

                <SubmitButtonComponent text="Sign in" />

              </fieldset>
            </Form>
          </section>

          <section className="py-8 lg:flex lg:gap-x-8">

            <Form
              id="sign-up"
              method="post" 
              className="auth-form" 
              action=""
            >
              <fieldset>

                <InputComponent id="sign-up-first-name-input" label="Email" name="firstName" />

                <InputComponent id="sign-up-last-name-input" label="Email" name="lastName" />

                <InputComponent id="sign-up-email-input" label="Email" name="email" type="email" />

                <InputComponent id="sign-up-password-input" label="Password" name="password" type="password" />

                <SubmitButtonComponent text="Sign up" />

              </fieldset>
            </Form>

           <div className="py-4 lg:w-[80rem]">
            <H3Component text="How it works" />
            <ul>
                <HomeStepsItem step={1} text="Sign up" />
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
