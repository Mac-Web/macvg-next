"use client";

import PrimaryButton from "./PrimaryButton";

function SignInBtn() {
  function handleSignin() {
    if (typeof window !== "undefined") {
      window.open(process.env.NEXT_PUBLIC_AUTH_URL + "/?redirect=macvg", "_self");
    }
  }
  return <PrimaryButton text="Sign in" click={handleSignin} />;
}

export default SignInBtn;
