"use client";

import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({ children, guest }) {
  const [count, setCount] = useState();

  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  return (
    <form
      className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900"
      action={updateGuest}>
      <div className="space-y-2">
        <label htmlFor="fullName">Full name</label>
        <input
          disabled
          id="fullName"
          defaultValue={fullName}
          name="fullName"
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">Email address</label>
        <input
          disabled
          id="email"
          name="email"
          defaultValue={email}
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          id="nationalID"
          defaultValue={nationalID}
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitButton title="Update Profile" loadingText="Updating..." />
      </div>
    </form>
  );
}
