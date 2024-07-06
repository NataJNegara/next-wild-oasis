"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// SIGN-IN====================================================
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

// SIGN-OUT====================================================
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// UPDATE-GUEST====================================================
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized : Login is required");

  const nationalID = formData.get("nationalID");

  const splitIndex = formData.get("nationality").indexOf("%");
  const nationality = formData.get("nationality").substring(0, splitIndex);
  const countryFlag = formData.get("nationality").substring(splitIndex + 1);

  if (!/^[a-zA-Z0-9]{8,16}$/.test(nationalID)) {
    throw new Error("National ID is invalid");
  }

  const updatedData = {
    nationality,
    nationalID,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.id);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

// DELETE-RESERVATION====================================================
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized : Login is required");

  // todo - fetch booking by id to make sure the user can only delete his own reservation
  const guestBookings = await getBookings(session.user.id);
  const guestBookingsId = guestBookings.map((booking) => booking.id);

  if (!guestBookingsId.includes(bookingId))
    throw new Error("Unauthorized: cannot delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservation");
}

// UPDATE-RESERVATION====================================================
export async function updateReservation(formData) {
  // authentication validation
  const session = await auth();
  if (!session) throw new Error("Unauthorized : Login is required");

  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  // authorization validation
  const guestBookings = await getBookings(session.user.id);
  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId)) {
    throw new Error("Unauthorized: cannot update this booking");
  }

  const newBooking = {
    numGuests: numGuests,
    observations: observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(newBooking)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

// CREATE-RESERVATION====================================================
export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized : Login is required");

  const numGuests = +formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);

  if (!numGuests || !bookingData.numNights || !bookingData.totalPrice)
    throw new Error("Failed to create reservation : All field is required!");

  const newBooking = {
    ...bookingData,
    numGuests,
    observations,
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    guestId: session.user.id,
  };

  console.log(newBooking);

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabindId}`);
  redirect("/cabins/success");
}
