import { Form, useTransition } from "@remix-run/react";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";
import { SubmitButtonComponent } from "~/components/forms/submit-button.component";
import { type Recipient } from "~/models/recipient.model";
import { type User } from "~/models/user.model";

export const RecipientItemComponent = ({ letterId, recipient, user }: { letterId: number; recipient: Recipient; user: User; }) => {
  const transition = useTransition();

  return (
    <li className="w-fit mb-4">
      <div className="border p-4 rounded-lg flex gap-x-4 items-start">
        <div 
          className={`font-bold text-white px-2 py-2 rounded-full ${recipient.signedAt === null ? 'bg-gray-500' : 'bg-green-500'}`}
        >
          {
            recipient.signedAt === null ? (
              <IoTime />
            ) : (
              <IoCheckmarkCircle />
            )
          }
        </div>
        <div>
          <div className="font-bold">{ recipient.role.title } ({ recipient.level + 1 })</div>
          <div>Recipient name: { recipient.role.user.title } { recipient.role.user.firstName } { recipient.role.user.lastName }</div>

          {
            recipient.signedAt && (
              <div>Signed on: { new Date(recipient.signedAt).toUTCString() }</div>
            )
          }

          {
            recipient.role.user.id === user.id && recipient.signedAt === null && (
              <Form
                action="sign"
                method="post"
              >
                <fieldset disabled={transition.state !== 'idle'}>
                  <input name="letterId" value={letterId} type="hidden" />
                  <SubmitButtonComponent text="Sign letter" />
                </fieldset>
              </Form>
            )
          }
        </div>
      </div>
    </li>
  );
}
