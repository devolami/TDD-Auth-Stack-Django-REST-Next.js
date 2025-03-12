import React from "react";
import { ResetPasswordConfirmForm} from "@/client/auth";

import { Setup } from "@/client/auth";
type Props = {
  params: {
    uid: string;
    token: string;
  };
}

const Page = ({params: {uid, token}}: Props) => {
  return (
    <div>
      <Setup />
      <ResetPasswordConfirmForm uid={uid} token={token}/>
      
    </div>
  );
};

export default Page;
