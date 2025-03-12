"use client";
import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

import continueWithSocialAuth from "./continue-with-social-auth";

export const continueWithGoogle = () =>
  continueWithSocialAuth("google-oauth2", "google");
export const continueWithFacebook = () =>
  continueWithSocialAuth("facebook", "facebook");

type SocialLinksProps = {
  label: string;
};

type SocialLinksConfigProps = {
  name: string;
  bgColor: string;
};
const SocialLinksConfig: SocialLinksConfigProps[] = [
  {
    name: "Google",
    bgColor: "#ea4335",
  },
  {
    name: "Facebook",
    bgColor: "#4267B2",
  },
];

export const SocialLinks = ({ label }: SocialLinksProps) => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row w-full gap-[10px] my-[30px]">
        {SocialLinksConfig.map((config) => (
          <button
            className="flex items-center justify-center w-full px-[10px] py-[12px] mt-[10px] text-white no-underline border-none rounded-[5px]"
            key={config.name}
            style={{
              backgroundColor: config.bgColor,
            }}
            onClick={
              config.name === "Google"
                ? continueWithGoogle
                : continueWithFacebook
            }
          >
            {""}
            {config.name === "Google" ? (
              <FaGoogle />
            ) : (
              <FaFacebookF/>
            )}
            {`${config.name} ${label}`}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
};
